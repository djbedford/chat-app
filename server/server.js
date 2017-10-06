const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { User } = require('./utils/user');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const server = http.createServer(app);
const io = socketIO(server);
const user = new User();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);

    user.removeUser(socket.id);
    user.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', user.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var userDetails = user.getUser(socket.id);

    if (userDetails && isRealString(message.text)) {
      io.to(userDetails.room).emit('newMessage', generateMessage(userDetails.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var userDetails = user.getUser(socket.id);

    if (userDetails) {
      io.to(userDetails.room).emit('newLocationMessage', generateLocationMessage(userDetails.name, coords.latitude, coords.longitude))
    }
  });

  socket.on('disconnect', () => {
    var removedUser = user.removeUser(socket.id);

    if (removedUser) {
      io.to(removedUser.room).emit('updateUserList', user.getUserList(removedUser.room));
      io.to(removedUser.room).emit('newMessage', generateMessage('Admin', `${removedUser.name} has left the building!`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
