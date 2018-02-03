const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('connected');

  socket.emit('newEmail', {
    from: 'todd@toddServer.com',
    text: 'hey whats going on',
    createdAt: 123,
  });

  socket.on('createMessage', newMessage => {
    console.log(newMessage);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(port, () => {
  console.log(`server is servin' all y'all on ${port}`);
});
