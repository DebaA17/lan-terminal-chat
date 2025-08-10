// server.js
const net = require('net');

const clients = [];

const server = net.createServer((socket) => {
  socket.name = '';
  console.log('Client connected:', socket.remoteAddress);

  socket.write('Please enter your username:\n');

  socket.once('data', (data) => {
    socket.name = data.toString().trim();
    socket.write(`Welcome, ${socket.name}!\n`);
    broadcast(`${socket.name} joined the chat.\n`, socket);

    clients.push(socket);

    socket.on('data', (msg) => {
      const message = msg.toString().trim();
      if (message) {
        broadcast(`[@${socket.name}]: ${message}\n`, socket);
      }
    });

    socket.on('end', () => {
      clients.splice(clients.indexOf(socket), 1);
      broadcast(`${socket.name} has left the chat.\n`, socket);
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err.message);
    });
  });
});

function broadcast(message, sender) {
  clients.forEach((client) => {
    if (client !== sender && client.writable) {
      client.write(message);
    }
  });
}

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`LAN Chat Server running on port ${PORT}`);
});

