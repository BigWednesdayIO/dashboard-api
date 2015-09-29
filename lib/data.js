'use strict';

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
  paymentMethods: [{
    id: 1,
    user_id: 5,
    name: 'Mr A Knights',
    type: 'VISA',
    last4: '1111',
    expiry_month: 1,
    expiry_year: 2021,
    address: {
      line1: 'Big Wednesday IO',
      line2: '20 Ropemaker Street',
      city: 'London',
      postcode: 'EC2Y 9AR',
      country: 'GB'
    }
  }],
  applications: [{
    id: 1,
    plan_id: 1,
    payment_method_id: 1
  }, {
    id: 2,
    plan_id: 1,
    payment_method_id: 1
  }, {
    id: 3,
    plan_id: 2,
    payment_method_id: 1
  }, {
    id: 4,
    plan_id: 3,
    payment_method_id: 1
  }, {
    id: 5,
    plan_id: 3,
    payment_method_id: 1
  }],
  applicationPermissions: [{
    user_id: 1,
    application_id: 1,
    scope: [
      'membership',
      'dashboard',
      'billing',
      'analytics'
    ]
  }, {
    user_id: 6,
    application_id: 1,
    scope: [
      'analytics'
    ]
  }, {
    user_id: 2,
    application_id: 2,
    scope: [
      'membership',
      'dashboard',
      'billing',
      'analytics'
    ]
  }, {
    user_id: 3,
    application_id: 3,
    scope: [
      'membership',
      'dashboard',
      'billing',
      'analytics'
    ]
  }, {
    user_id: 4,
    application_id: 4,
    scope: [
      'membership',
      'dashboard',
      'billing',
      'analytics'
    ]
  }, {
    user_id: 5,
    application_id: 5,
    scope: [
      'membership',
      'dashboard',
      'billing',
      'analytics'
    ]
  }, {
    user_id: 1,
    application_id: 5,
    scope: [
      'analytics'
    ]
  }],
  keys: [{
    id: 1,
    application_id: 1,
    key: 'abcdefg',
    scope: [
      'search'
    ]
  }, {
    id: 2,
    application_id: 1,
    key: 'a1b1c1d1',
    scope: [
      'addRecord',
      'deleteRecord'
    ]
  }, {
    id: 3,
    application_id: 2,
    key: 'hijklmn',
    scope: [
      'search'
    ]
  }, {
    id: 4,
    application_id: 2,
    key: 'e1f1g1h1',
    scope: [
      'addRecord',
      'deleteRecord'
    ]
  }, {
    id: 5,
    application_id: 3,
    key: 'opqrstu',
    scope: [
      'search'
    ]
  }, {
    id: 6,
    application_id: 3,
    key: 'i1j1k1l1',
    scope: [
      'addRecord',
      'deleteRecord'
    ]
  }, {
    id: 7,
    application_id: 4,
    key: 'vwxyzab',
    scope: [
      'search'
    ]
  }, {
    id: 8,
    application_id: 4,
    key: 'm1n1o1p1',
    scope: [
      'addRecord',
      'deleteRecord'
    ]
  }, {
    id: 9,
    application_id: 5,
    key: 'cdefghi',
    scope: [
      'search'
    ]
  }, {
    id: 10,
    application_id: 5,
    key: 'q1r1s1t1',
    scope: [
      'addRecord',
      'deleteRecord'
    ]
  }]
};
