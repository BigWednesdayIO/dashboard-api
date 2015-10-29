'use strict';

const expect = require('chai').expect;
const specRequest = require('../spec_request');
const tokenBuilder = require('../test_token').builder;
const userDb = require('../../lib/userDb');

describe('/authenticate', () => {
  describe('post', () => {
    describe('jwt authentication', () => {
      it('requires an email address', () => {
        const token = tokenBuilder({email_verified: true});
        return specRequest({
          url: `/authenticate?token=${token}`,
          method: 'POST'
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('No email address');
        });
      });

      it('requires email_verified', () => {
        const token = tokenBuilder({email: 'unverified_user@bigwednesday.io'});
        return specRequest({
          url: `/authenticate?token=${token}`,
          method: 'POST'
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('Email address not verified');
        });
      });

      it('requires email_verified to be true', () => {
        const token = tokenBuilder({email: 'unverified_user@bigwednesday.io', email_verified: 'yes'});
        return specRequest({
          url: `/authenticate?token=${token}`,
          method: 'POST'
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('Email address not verified');
        });
      });
    });

    describe('new user', () => {
      const token = tokenBuilder({email: 'new_user@bigwednesday.io', email_verified: true});

      let newUserResponse;

      before(() => {
        newUserResponse = undefined;
        return specRequest({
          url: `/authenticate?token=${token}`,
          method: 'POST'
        })
        .then(response => {
          newUserResponse = response;
        });
      });

      it('returns HTTP 201', () => {
        expect(newUserResponse.statusCode).to.equal(201);
      });

      it('provides created resource location', () => {
        expect(newUserResponse.headers.location).to.equal(`/users/${newUserResponse.result.id}`);
      });

      it('returns user id', () => {
        expect(newUserResponse.result.id).to.be.ok;
      });

      it('persists user', () => {
        const createdUser = userDb.findByEmail('new_user@bigwednesday.io');
        expect(createdUser.id).to.equal(newUserResponse.result.id);
      });
    });
  });
});
