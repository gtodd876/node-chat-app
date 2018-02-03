var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'todd';
    var text = 'hello';
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({
      from,
      text,
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = '';
    var lat = 123;
    var lng = 345;
    var url = `https://www.google.com/maps?q=123,345`;
    var message = generateLocationMessage(from, lat, lng);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({ from, url });
  });
});
