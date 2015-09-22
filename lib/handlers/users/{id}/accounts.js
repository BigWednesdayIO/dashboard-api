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

    const accounts = _.filter(data.accounts, account => {
      return _.any(data.accountPermissions, {userId: req.params.id, accountId: account.id});
    });

    reply(accounts);
  }
};
