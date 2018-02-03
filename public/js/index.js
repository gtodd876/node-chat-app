var socket = io();

socket.on('connect', function() {
  socket.emit('createMessage', {
    from: 'client@client.com',
    text: 'Does this work?',
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
  console.log(email);
});
