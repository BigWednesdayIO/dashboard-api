'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../../data');

module.exports = {
  get(req, reply) {
    const permissions = _.filter(data.applicationPermissions, {application_id: req.params.id});

    reply(permissions);
  }
};
