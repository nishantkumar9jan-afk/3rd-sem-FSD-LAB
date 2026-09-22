const EventEmitter = require('event');

class Button extends EventEmitter{};

const button = new Button();

button.on('click', ()=> {

}
);