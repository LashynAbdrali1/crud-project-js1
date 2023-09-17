// user.js

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class UserDatabase {
  constructor() {
    this.users = [];
  }

  createUser(id, name, email) {
    const user = new User(id, name, email);
    this.users.push(user);
  }

  updateUser(userId, updatedName, updatedEmail) {
    const user = this.getUser(userId);
    if (user) {
      user.name = updatedName;
      user.email = updatedEmail;
    }
  }

  deleteUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }
}

module.exports = { User, UserDatabase };

// user.test.js

const { expect } = require('chai');
const { User, UserDatabase } = require('./user');

describe('User Database', () => {
  let userDb;

  beforeEach(() => {
    userDb = new UserDatabase();
  });

  it('should create a user', () => {
    userDb.createUser(1, 'John Doe', 'john@example.com');
    expect(userDb.users).to.have.lengthOf(1);
  });

  it('should update a user', () => {
    userDb.createUser(1, 'John Doe', 'john@example.com');
    userDb.updateUser(1, 'Updated John Doe', 'updated@example.com');
    const foundUser = userDb.getUser(1);

    expect(foundUser.name).to.equal('Updated John Doe');
    expect(foundUser.email).to.equal('updated@example.com');
  });

  it('should delete a user', () => {
    userDb.createUser(1, 'John Doe', 'john@example.com');
    userDb.createUser(2, 'Jane Smith', 'jane@example.com');
    userDb.deleteUser(1);

    const foundUser = userDb.getUser(1);
    expect(foundUser).to.be.undefined;
    expect(userDb.users).to.have.lengthOf(1);
  });

  it('should get a user by ID', () => {
    userDb.createUser(1, 'John Doe', 'john@example.com');
    userDb.createUser(2, 'Jane Smith', 'jane@example.com');
    const foundUser = userDb.getUser(2);

    expect(foundUser.name).to.equal('Jane Smith');
    expect(foundUser.email).to.equal('jane@example.com');
  });
});
