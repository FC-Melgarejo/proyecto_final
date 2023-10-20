const MessageDTO = require('./dtos/messageDTO');

// ...

function createNewMessage(sender, content) {
    const timestamp = new Date(); // Esto es un ejemplo, puedes usar la marca de tiempo real
    const newMessage = new MessageDTO(sender, content, timestamp);

    // Realizar lógica de negocio y persistencia aquí...
}

module.exports = { createNewMessage };
