// let body = '';

// req.on('data', chunk => {
//     body += chunk;
// });

// req.on('end', () => {
//     try {
//         const data = JSON.parse(body);

//         fs.writeFile(DATA_FILE, data.text + '\n', err => {
//             if (err)
//                 return sendJSON(res, 500, { error: err.message });

//             sendJSON(res, 200, {
//                 message: 'File created'
//             });
//         });

//     } catch (err) {
//         sendJSON(res, 400, {
//             error: 'Invalid JSON'
//         });
//     }
// });

// domLikeEvents.js

const EventEmitter = require('events');

class Button extends EventEmitter {
    click() {
        this.emit('click');
    }
}

const button = new Button();

button.on('click', () => {
    console.log('Button Clicked!');
});

console.log('Simulating button click...');
button.click();