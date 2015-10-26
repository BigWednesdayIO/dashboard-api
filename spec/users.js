'use strict';

const expect = require('chai').expect;
const specRequest = require('./spec_request');

describe('/users', () => {
  describe('post', () => {
    it('creates a user', () => {
      return specRequest({
        url: '/users',
        method: 'POST',
        payload: {email: 'test@bigwednesday.io'}
      })
      .then(response => {
        expect(response.statusCode).to.equal(201);
        expect(response.headers.location).to.equal(`/users/${response.result.id}`);
      });
    });

    describe('validation', () => {
      it('requires an email address', () => {
        return specRequest({
          url: '/users',
          method: 'POST',
          payload: {}
        })
        .then(response => {
          expect(response.statusCode).to.equal(400);
          expect(response.result.message).to.equal('child "email" fails because ["email" is required]');
        });
      });

      it('rejects id field', () => {
        return specRequest({
          url: '/users',
          method: 'POST',
          payload: {id: 1, email: 'test@bigwednesday.io'}
        })
        .then(response => {
          expect(response.statusCode).to.equal(400);
          expect(response.result.message).to.equal('"id" is not allowed');
        });
      });
    });
  });
});
