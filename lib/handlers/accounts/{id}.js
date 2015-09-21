'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../data');

module.exports = {
  get(req, reply) {
    const account = _.find(data.accounts, {id: req.params.id});

    reply(account || boom.notFound());
  }
};
