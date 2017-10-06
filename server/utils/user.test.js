const expect = require('expect');

const { User } = require('./user');

describe('User', () => {
  var users;

  beforeEach(() => {
    users = new User();
    users.users = [
      {
        id: '1',
        name: 'David',
        room: 'Node Course',
      },
      {
        id: '2',
        name: 'Bob',
        room: 'React Course',
      },
      {
        id: '3',
        name: 'Emma',
        room: 'Node Course',
      },
    ];
  });

  it('should add new user', () => {
    var users = new User();
    var user = {
      id: '123',
      name: 'David',
      room: 'The Office',
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var user = users.removeUser('2');

    expect(user.id).toBe('2');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('1');

    expect(user.id).toBe('1');
  });

  it('should not find user', () => {
    var user = users.getUser('4');

    expect(user).toNotExist();
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['David', 'Emma']);
  });

  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Bob']);
  });
});
