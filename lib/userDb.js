'use strict';

const cuid = require('cuid');
const _ = require('lodash');

const users = [];

class UserDb {
  create(userAttr) {
    const id = cuid();
    const user = Object.assign({id}, userAttr);
    users.push(user);
    return user;
  }

  findByEmail(email) {
    return _.find(users, {email});
  }

  findById(id) {
    return _.find(users, {id});
  }
}

module.exports = new UserDb();
