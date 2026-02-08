const net = require('net');

const HOST = 'spec01-shard-00-00.nupor.mongodb.net';
const PORT = 27017;

console.log(`Testing connection to ${HOST}:${PORT}...`);

const socket = new net.Socket();
socket.setTimeout(5000);

socket.connect(PORT, HOST, () => {
    console.log('✅ Connected successfully to MongoDB shard!');
    socket.destroy();
});

socket.on('error', (err) => {
    console.error('❌ Connection failed:', err.message);
});

socket.on('timeout', () => {
    console.error('❌ Connection timed out');
    socket.destroy();
});
