// const fs = require('fs');

// fs.writeFile('example.txt', 'Hello World!', (err) => {
//     if (err) throw err;
//     console.log('File created!');

//     fs.appendFile('example.txt', '\nThis is updated content.', (err) => {
//         if (err) throw err;
//         console.log('File updated!');

//         fs.readFile('example.txt', 'utf8', (err, data) => {
//             if (err) throw err;
//             console.log('File content:\n' + data);
//             const fs = require('fs');

//             fs.unlink('example.txt', (err) => {
//                 if (err) throw err;
//                 console.log('File deleted successfully!');
//             });
//         });
//     });


// const fs = require('fs');

// console.log('1: Start (sync)');

// setTimeout(() => {
//     console.log('2: Inside setTimeout (macrotask - runs LAST)');
// }, 0);

// Promise.resolve().then(() => {
//     console.log('3: Promise (async)');
// });

// fs.readFile(__filename, () => {
//     console.log('4: readFile (async)');
// });

// console.log('5: end (sync)');


// console.log('1: start (sync)');

// setTimeout(() => {
//     console.log('2: setTimeout (async)');
// }, 0);

// setImmediate(() => {
//     console.log('3: setImmediate (async)');
// });

// process.nextTick(() => {
//     console.log('4: nextTick (async)');
// });

// Promise.resolve().then(() => {
//     console.log('5: Promise (async)');
// });

// console.log('6: end (sync)');


const fs = require('fs');

// CREATE
fs.writeFileSync('data.txt', 'Hello, this is a new file.');
console.log('File created successfully.');

// READ
let content = fs.readFileSync('data.txt', 'utf8');
console.log('\nFile Content:');
console.log(content);

// UPDATE
fs.appendFileSync('data.txt', '\nThis line is added during update.');
console.log('\nFile updated successfully.');

// READ UPDATED FILE
content = fs.readFileSync('data.txt', 'utf8');
console.log('\nUpdated File Content:');
console.log(content);

// DELETE
fs.unlinkSync('data.txt');
console.log('\nFile deleted successfully.');