var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log(message);
  var li = document.createElement('li');
  li.textContent = `${message.from}: ${message.text}`;
  var ol = document.querySelector('#messages');
  ol.appendChild(li);
});

// socket.emit(
//   'createMessage',
//   {
//     from: 'frank',
//     text: 'hi',
//   },
//   function(msg) {
//     console.log(msg, ': Got it!');
//   }
// );

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.querySelector('.input');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: input.value,
    },
    function(msg) {
      console.log(msg, ': Got it!');
    }
  );
  input.value = '';
});
