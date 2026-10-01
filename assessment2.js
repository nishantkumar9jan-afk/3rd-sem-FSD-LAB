const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const FILES_DIR = path.join(__dirname, "files");


if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR, { recursive: true });
}

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}


function safeFilePath(name) {
  if (!name || name !== path.basename(name) || name.startsWith(".")) return null;
  return path.join(FILES_DIR, name);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const parts = url.pathname.split("/").filter(Boolean); 

    if (parts[0] !== "files" || parts.length > 2) {
      return sendJSON(res, 404, { error: "Route not found" });
    }

    const name = parts[1] ? decodeURIComponent(parts[1]) : null;

   
    if (req.method === "GET" && !name) {
      const list = await fs.promises.readdir(FILES_DIR);
      return sendJSON(res, 200, { files: list });
    }

    if (req.method === "POST" && !name) {
      let data;
      try {
        data = JSON.parse(await readBody(req));
      } catch {
        return sendJSON(res, 400, { error: "Invalid JSON body" });
      }
      const filePath = safeFilePath(data.filename);
      if (!filePath) return sendJSON(res, 400, { error: "Invalid filename" });
      if (typeof data.content !== "string") {
        return sendJSON(res, 400, { error: "content must be a string" });
      }
      if (fs.existsSync(filePath)) {
        return sendJSON(res, 409, { error: "File already exists" });
      }
      await fs.promises.writeFile(filePath, data.content, "utf8");
      return sendJSON(res, 201, { message: "File created", filename: data.filename });
    }


    if (!name) return sendJSON(res, 405, { error: "Method not allowed" });
    const filePath = safeFilePath(name);
    if (!filePath) return sendJSON(res, 400, { error: "Invalid filename" });

 
    if (req.method === "GET") {
      if (!fs.existsSync(filePath)) return sendJSON(res, 404, { error: "File not found" });
      const content = await fs.promises.readFile(filePath, "utf8");
      return sendText(res, 200, content);
    }

  
    if (req.method === "PUT") {
      if (!fs.existsSync(filePath)) return sendJSON(res, 404, { error: "File not found" });
      let data;
      try {
        data = JSON.parse(await readBody(req));
      } catch {
        return sendJSON(res, 400, { error: "Invalid JSON body" });
      }
      if (typeof data.content !== "string") {
        return sendJSON(res, 400, { error: "content must be a string" });
      }
      await fs.promises.writeFile(filePath, data.content, "utf8");
      return sendJSON(res, 200, { message: "File updated", filename: name });
    }

    
    if (req.method === "DELETE") {
      if (!fs.existsSync(filePath)) return sendJSON(res, 404, { error: "File not found" });
      await fs.promises.unlink(filePath);
      return sendJSON(res, 200, { message: "File deleted", filename: name });
    }

    return sendJSON(res, 405, { error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return sendJSON(res, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});