'use strict';

const data = require('../data');

module.exports = {
  get(req, reply) {
    reply(data.plans);
  }
};
