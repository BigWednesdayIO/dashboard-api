'use strict';

module.exports = {
  get(req, reply) {
    reply([{
      name: 'twitter',
      url: 'http://bigwednesday.io:8080/twitter-login'
    }]);
  }
};
