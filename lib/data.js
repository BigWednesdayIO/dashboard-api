'use strict';

/*eslint-disable*/
module.exports = {
  plans: [{
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
  }],
  users: [{
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
  }],
  accounts:  [{
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
  }],
  accountPermissions: [{
    userId: 1,
    accountId: 1,
    scope: [
      "membership",
      "dashboard",
      "billing",
      "analytics"
    ]
  }, {
    userId: 6,
    accountId: 1,
    scope: [
      "analytics"
    ]
  }, {
    userId: 2,
    accountId: 2,
    scope: [
      "membership",
      "dashboard",
      "billing",
      "analytics"
    ]
  }, {
    userId: 3,
    accountId: 3,
    scope: [
      "membership",
      "dashboard",
      "billing",
      "analytics"
    ]
  }, {
    userId: 4,
    accountId: 4,
    scope: [
      "membership",
      "dashboard",
      "billing",
      "analytics"
    ]
  }, {
    userId: 5,
    accountId: 5,
    scope: [
      "membership",
      "dashboard",
      "billing",
      "analytics"
    ]
  }, {
    userId: 1,
    accountId: 5,
    scope: [
      "analytics"
    ]
  }]
};
/*eslint-enable*/
