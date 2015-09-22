'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../data');

module.exports = {
  get(req, reply) {
    const application = _.find(data.applications, {id: req.params.id});

    reply(application || boom.notFound());
  }
};
