const EventEmitter = require('events'); 

  

class MyEmitter extends EventEmitter {} 

  

const myEmitter = new MyEmitter(); 

  

myEmitter.on('greet', (name) => { 

    console.log(`Hello, ${name}! Welcome.`); 

}); 

  

myEmitter.on('exit', () => { 

    console.log('Goodbye! Program exited.'); 

}); 

 myEmitter.emit('greet', 'Nishant'); 

myEmitter.emit('exit'); 





