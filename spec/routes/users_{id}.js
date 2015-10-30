'use strict';

const expect = require('chai').expect;
const specRequest = require('../spec_request');
const jwtUtil = require('../jwt_util');
const token = jwtUtil.sign();

describe('/users_{id}', () => {
  let credentials;

  before(() => {
    const auth0Token = jwtUtil.sign({
      email: 'test@bigwednesday.io',
      email_verified: true
    });

    return specRequest({
      url: `/authenticate?token=${auth0Token}`,
      method: 'POST'
    })
    .then(response => {
      credentials = response.result;
    });
  });

  describe('get', () => {
    it('gets a user by id', () => {
      return specRequest({
        url: `/users/${credentials.id}?token=${credentials.token}`,
        method: 'GET'
      })
      .then(response => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.eql({id: credentials.id, email: 'test@bigwednesday.io'});
      });
    });

    it('returns a 403 when requesting a user other than self', () => {
      return specRequest({
        url: `/users/another_user_id?token=${token}`,
        method: 'GET'
      })
      .then(response => {
        expect(response.statusCode).to.equal(403);
        expect(response.result.message).to.equal('Insufficient scope, expected any of: user:another_user_id');
      });
    });
  });
});
