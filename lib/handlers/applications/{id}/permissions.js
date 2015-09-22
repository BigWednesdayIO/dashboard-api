'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../../data');

module.exports = {
  get(req, reply) {
    const userPermission = _.find(data.applicationPermissions, {application_id: req.params.id, user_id: req.query.user_id});

    reply(userPermission ? {scope: userPermission.scope} : boom.notFound());
  }
};
