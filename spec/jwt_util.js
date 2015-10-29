'use strict';

const jsonwebtoken = require('jsonwebtoken');
const jwtSigner = require('../lib/jwt_signer');

class JwtUtil {
  constructor() {
    this.audience = jwtSigner.audience;
    this.secret = jwtSigner.secret;
    this.issuer = jwtSigner.issuer;
  }

  sign(payload, signOptions) {
    payload = payload || {};

    const opts = Object.assign({
      algorithm: 'HS256',
      issuer: this.issuer,
      audience: this.audience
    }, signOptions);

    return jsonwebtoken.sign(payload, this.secret, opts);
  }

  verify(token) {
    return jsonwebtoken.verify(token, this.secret);
  }
}

module.exports = new JwtUtil();
