'use strict';

const expect = require('chai').expect;
const specRequest = require('./spec_request');
const token = require('./test_token').valid;

describe('/users', () => {
  describe('post', () => {
    describe('created user', () => {
      let createUserResponse;

      beforeEach(() => {
        createUserResponse = undefined;
        return specRequest({
          url: `/users?token=${token}`,
          method: 'POST',
          payload: {
            email: 'test@bigwednesday.io',
            company: 'A company'
          }
        })
        .then(response => {
          if (response.statusCode !== 201) {
            return console.error(response.result);
          }
          createUserResponse = response;
        });
      });

      it('returns http 201', () => {
        expect(createUserResponse.statusCode).to.equal(201);
      });

      it('provides created resource location', () => {
        expect(createUserResponse.headers.location).to.equal(`/users/${createUserResponse.result.id}`);
      });

      it('has email address', () => {
        expect(createUserResponse.result.email).to.equal('test@bigwednesday.io');
      });

      it('has company', () => {
        expect(createUserResponse.result.company).to.equal('A company');
      });
    });

    describe('validation', () => {
      it('requires email address', () => {
        return specRequest({
          url: `/users?token=${token}`,
          method: 'POST',
          payload: {}
        })
        .then(response => {
          expect(response.statusCode).to.equal(400);
          expect(response.result.message).to.equal('child "email" fails because ["email" is required]');
        });
      });

      it('validates email address format', () => {
        return specRequest({
          url: `/users?token=${token}`,
          method: 'POST',
          payload: {email: 'bigwednesday.io'}
        })
        .then(response => {
          expect(response.statusCode).to.equal(400);
          expect(response.result.message).to.equal('child "email" fails because ["email" must be a valid email]');
        });
      });

      it('validates company is string', () => {
        return specRequest({
          url: `/users?token=${token}`,
          method: 'POST',
          payload: {email: 'test@bigwednesday.io', company: 1}
        })
        .then(response => {
          expect(response.statusCode).to.equal(400);
          expect(response.result.message).to.equal('child "company" fails because ["company" must be a string]');
        });
      });

      it('rejects id field', () => {
        return specRequest({
          url: `/users?token=${token}`,
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
