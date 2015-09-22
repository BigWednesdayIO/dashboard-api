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

    const applications = _.filter(data.applications, application => {
      return _.any(data.applicationPermissions, {user_id: req.params.id, application_id: application.id});
    });

    reply(applications);
  }
};
