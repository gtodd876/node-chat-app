var socket = io();

function scrollToBottom() {
  var messages = document.getElementById('messages');
  var newMessage = messages.querySelector('li:last-child');

  var clientHeight = messages.clientHeight;
  var scrollTop = messages.scrollTop;
  var scrollHeight = messages.scrollHeight;
  var newMessageHeight = newMessage.clientHeight;
  if (newMessage.previousElementSibling) var lastMessageHeight = newMessage.previousElementSibling.clientHeight;

  if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
}

socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  var ul = document.createElement('ul');
  users.forEach(function(user) {
    var li = document.createElement('li');
    li.textContent = user;
    ul.appendChild(li);
  });
  document.getElementById('users').innerHTML = '';
  document.getElementById('users').appendChild(ul);
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = document.getElementById('message-template').innerHTML;
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  document.getElementById('messages').appendChild(document.createRange().createContextualFragment(html));
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = document.getElementById('location-message-template').innerHTML;
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime,
  });
  document.getElementById('messages').appendChild(document.createRange().createContextualFragment(html));
  scrollToBottom();
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
    function() {}
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
