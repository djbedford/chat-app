const expect = require('expect');

const { generateMessage } = require('./message');

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
