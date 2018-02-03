var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = document.createElement('li');
  li.textContent = `${message.from} ${formattedTime}: ${message.text}`;
  var ol = document.querySelector('#messages');
  ol.appendChild(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.setAttribute('href', message.url);
  a.setAttribute('target', '_blank');
  a.textContent = 'My Location';
  li.textContent = `${message.from} ${formattedTime}: `;
  li.appendChild(a);
  var ol = document.querySelector('#messages');
  ol.appendChild(li);
});

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

var locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser');

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.textContent = 'sending..........';

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttribute('disabled');
      locationButton.textContent = 'Send Location';
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function() {
      locationButton.removeAttribute('disabled');
      locationButton.textContent = 'Send Location';
      alert('Unable to fetch location');
    }
  );
});
