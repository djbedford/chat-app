const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');
});

io.on('disconnect', () => {
  console.log('User was disconnected.');
});

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
