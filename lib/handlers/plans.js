'use strict';

/* eslint camelcase: 0 */
const staticPlans = [{
  id: 1,
  name: 'bronze',
  price: 50,
  max_records: 100000
}, {
  id: 2,
  name: 'silver',
  price: 120,
  max_records: 1000000
}, {
  id: 3,
  name: 'gold',
  price: 400,
  max_records: 5000000
}];

module.exports = {
  get(req, reply) {
    reply(staticPlans);
  }
};
