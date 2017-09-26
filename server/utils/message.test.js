const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let message = generateMessage('David', 'This is a test');

    expect(message).toInclude({
      from: 'David',
      text: 'This is a test',
    });
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var message = generateLocationMessage('Admin', 5, 21);

    expect(message).toInclude({
      from: 'Admin',
      url: 'https://www.google.com/maps?q=5,21'
    });
    expect(message.createdAt).toBeA('number');
  });
});
