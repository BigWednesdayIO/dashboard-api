'use strict';

const _ = require('lodash');
const boom = require('boom');

/*eslint-disable*/
const staticAccounts = [{
  id: 1,
  plan_id: 1,
  billing_name: 'Mr A Knights',
  billing_address_line1: 'Big Wednesday IO',
  billing_address_line2: '20 Ropemaker Street',
  billing_address_city: 'London',
  billing_address_region: 'London',
  billing_address_postcode: 'EC2Y 9AR',
  billing_address_country: 'GB',
  billing_card_type: 'VISA',
  billing_card_last4: '1111',
  billing_card_expiry_month: 1,
  billing_card_expiry_year: 2021
}, {
  id: 2,
  plan_id: 1,
  billing_name: 'Mr A Knights',
  billing_address_line1: 'Big Wednesday IO',
  billing_address_line2: '20 Ropemaker Street',
  billing_address_city: 'London',
  billing_address_region: 'London',
  billing_address_postcode: 'EC2Y 9AR',
  billing_address_country: 'GB',
  billing_card_type: 'VISA',
  billing_card_last4: '1111',
  billing_card_expiry_month: 1,
  billing_card_expiry_year: 2021
}, {
  id: 3,
  plan_id: 2,
  billing_name: 'Mr A Knights',
  billing_address_line1: 'Big Wednesday IO',
  billing_address_line2: '20 Ropemaker Street',
  billing_address_city: 'London',
  billing_address_region: 'London',
  billing_address_postcode: 'EC2Y 9AR',
  billing_address_country: 'GB',
  billing_card_type: 'VISA',
  billing_card_last4: '1111',
  billing_card_expiry_month: 1,
  billing_card_expiry_year: 2021
}, {
  id: 4,
  plan_id: 3,
  billing_name: 'Mr A Knights',
  billing_address_line1: 'Big Wednesday IO',
  billing_address_line2: '20 Ropemaker Street',
  billing_address_city: 'London',
  billing_address_region: 'London',
  billing_address_postcode: 'EC2Y 9AR',
  billing_address_country: 'GB',
  billing_card_type: 'VISA',
  billing_card_last4: '1111',
  billing_card_expiry_month: 1,
  billing_card_expiry_year: 2021
}, {
  id: 5,
  plan_id: 3,
  billing_name: 'Mr A Knights',
  billing_address_line1: 'Big Wednesday IO',
  billing_address_line2: '20 Ropemaker Street',
  billing_address_city: 'London',
  billing_address_region: 'London',
  billing_address_postcode: 'EC2Y 9AR',
  billing_address_country: 'GB',
  billing_card_type: 'VISA',
  billing_card_last4: '1111',
  billing_card_expiry_month: 1,
  billing_card_expiry_year: 2021
}];
/*eslint-enable*/

module.exports = {
  get(req, reply) {
    const account = _.find(staticAccounts, {id: req.params.id});

    reply(account || boom.notFound());
  }
};
