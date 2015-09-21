'use strict';

const _ = require('lodash');
const boom = require('boom');

const data = require('../../../data');

module.exports = {
  get(req, reply) {
    const account = _.find(data.accounts, {id: req.params.id});

    if (!account) {
      return reply(boom.notFound());
    }

    const keys = _(data.keys)
      .filter({account_id: req.params.id})
      .map(key => {
        return {id: key.id, key: key.key, scope: key.scope};
      })
      .value();

    reply(keys);
  }
};
