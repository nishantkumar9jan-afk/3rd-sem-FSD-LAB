const http = require("http");

const server = http.createServer((req, res) => {

    // Home Route
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome to Home Page</h1>");
    }

    // About Route
    else if (req.url === "/about" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>This is About Page</h1>");
    }

    // Contact Route
    else if (req.url === "/contact" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>This is Contact Page</h1>");
    }

    // Invalid Route
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


