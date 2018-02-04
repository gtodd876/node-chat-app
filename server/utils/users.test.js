const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Todd',
        room: 'Node Course',
      },
      {
        id: '2',
        name: 'Stacy',
        room: 'React Course',
      },
      {
        id: '3',
        name: 'Piper',
        room: 'Node Course',
      },
    ];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Todd',
      room: 'JS fans',
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Todd', 'Piper']);
  });

  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Stacy']);
  });
  it('should return a user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should not return a user', () => {
    var userId = '4';
    var user = users.getUser(userId);
    expect(user).toBeUndefined();
  });

  it('should remove the selected user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });
});
