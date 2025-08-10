// client.js
const net = require('net');
const readline = require('readline');

// 🛠️ Change this to your LAN server IP
const HOST = 'localhost';
const PORT = 5000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log(`Connected to chat server at ${HOST}:${PORT}`);
});

client.on('data', (data) => {
  process.stdout.write(data.toString());
});

rl.on('line', (input) => {
  client.write(input);
});

client.on('end', () => {
  console.log('\nDisconnected from server.');
  process.exit(0);
});
