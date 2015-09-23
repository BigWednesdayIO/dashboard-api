'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../../data');

module.exports = {
  get(req, reply) {
    const user = _.find(data.users, {id: req.params.id});

    if (!user) {
      return reply(boom.notFound());
    }

    let query = {user_id: req.params.id};

    if (req.query.application_id) {
      query.application_id = req.query.application_id;
    }

    const permissions = _.filter(data.applicationPermissions, query);

    reply(permissions);
  }
};
