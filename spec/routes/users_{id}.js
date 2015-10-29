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
    it('gets a user', () => {
      return specRequest({
        url: `/users/${credentials.id}?token=${credentials.token}`,
        method: 'GET'
      })
      .then(response => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.eql({id: credentials.id, email: 'test@bigwednesday.io'});
      });
    });

    it('returns a 404 for invalid user id', () => {
      return specRequest({
        url: `/users/unknown_id?token=${token}`,
        method: 'GET'
      })
      .then(response => {
        expect(response.statusCode).to.equal(404);
        expect(response.result.message).to.equal('User unknown_id does not exist');
      });
    });
  });
});
