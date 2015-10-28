'use strict';

const jwt = require('jsonwebtoken');

const secret = new Buffer(process.env.CLIENT_SECRET, 'base64');

const builder = (payload, overrides) => {
  payload = payload || {};
  const opts = Object.assign({
    issuer: 'https://bigwednesday-io.eu.auth0.com/',
    audience: process.env.AUDIENCE,
    expiresIn: '1d'
  }, overrides);

  return jwt.sign(payload, secret, opts);
};

module.exports = {
  valid: builder(),
  builder
};
