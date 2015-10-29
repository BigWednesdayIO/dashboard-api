'use strict';

const jsonwebtoken = require('jsonwebtoken');

class JwtSigner {
  constructor() {
    if (!process.env.AUDIENCE) {
      throw new Error('AUDIENCE environment variable not set');
    }
    if (!process.env.CLIENT_SECRET) {
      throw new Error('CLIENT_SECRET environment variable not set');
    }

    this.secret = new Buffer(process.env.CLIENT_SECRET, 'base64');
    this.audience = process.env.AUDIENCE;
    this.issuer = 'https://bigwednesday-io.eu.auth0.com/';
    this.signingOptions = {
      algorithm: 'HS256',
      issuer: this.issuer,
      audience: this.audience
    };
  }

  sign(payload) {
    payload = payload || {};
    return jsonwebtoken.sign(payload, this.secret, this.signingOptions);
  }
}

module.exports = new JwtSigner();
