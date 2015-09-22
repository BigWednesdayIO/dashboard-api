'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../../data');

module.exports = {
  get(req, reply) {
    const userPermission = _.find(data.accountPermissions, {accountId: req.params.id, userId: req.query.user_id});

    reply(userPermission ? {scope: userPermission.scope} : boom.notFound());
  }
};
