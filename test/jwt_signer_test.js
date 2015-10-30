'use strict';

const jsonwebtoken = require('jsonwebtoken');
const expect = require('chai').expect;

describe('jwt', () => {
  describe('configuration', () => {
    let CLIENT_SECRET_backup;
    let AUDIENCE_backup;

    beforeEach(() => {
      CLIENT_SECRET_backup = process.env.CLIENT_SECRET;
      AUDIENCE_backup = process.env.AUDIENCE;
      delete require.cache['/src/lib/jwt_signer.js'];
    });

    afterEach(() => {
      process.env.CLIENT_SECRET = CLIENT_SECRET_backup;
      process.env.AUDIENCE = AUDIENCE_backup;
    });

    it('throws if CLIENT_SECRET not set', () => {
      delete process.env.CLIENT_SECRET;
      expect(() => require('../lib/jwt_signer')).to.throw(Error, /CLIENT_SECRET environment variable not set/);
    });

    it('throws if AUDIENCE not set', () => {
      delete process.env.AUDIENCE;
      expect(() => require('../lib/jwt_signer')).to.throw(Error, /AUDIENCE environment variable not set/);
    });
  });

  describe('signing', () => {
    const jwt = require('../lib/jwt_signer');
    const secret = new Buffer(process.env.CLIENT_SECRET, 'base64');

    let encodedToken;

    beforeEach(() => {
      encodedToken = jwt.sign({test: true});
    });

    it('includes requested payload', () => {
      expect(jsonwebtoken.verify(encodedToken, secret)).to.have.property('test', true);
    });

    it('signs token with HS256 algorithm', () => {
      expect(() => {
        jsonwebtoken.verify(encodedToken, secret, {algorithms: ['HS256']});
      }).to.not.throw();
    });

    it('signs token with issuer', () => {
      expect(() => {
        jsonwebtoken.verify(encodedToken, secret, {issuer: 'https://bigwednesday-io.eu.auth0.com/'});
      }).to.not.throw();
    });

    it('signs token with audience', () => {
      expect(() => {
        jsonwebtoken.verify(encodedToken, secret, {audience: process.env.audience});
      }).to.not.throw();
    });
  });
});
