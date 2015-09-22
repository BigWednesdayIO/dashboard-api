'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../data');

module.exports = {
  get(req, reply) {
    const user = _.find(data.users, {id: req.params.id});

    reply(user || boom.notFound());
  }
};
