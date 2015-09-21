'use strict';

const _ = require('lodash');
const boom = require('boom');

const staticUsers = [{
  id: 1,
  email: 'chris@bigwednesday.io'
}, {
  id: 2,
  email: 'toby@bigwednesday.io'
}, {
  id: 3,
  email: 'michael@bigwednesday.io'
}, {
  id: 4,
  email: 'dave@bigwednesday.io'
}, {
  id: 5,
  email: 'alex@bigwednesday.io'
}, {
  id: 6,
  email: 'newrecruit@bigwednesday.io'
}];

module.exports = {
  get(req, reply) {
    const user = _.find(staticUsers, {id: req.params.id});

    reply(user || boom.notFound());
  }
};
