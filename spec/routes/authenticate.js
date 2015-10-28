'use strict';

const expect = require('chai').expect;
const specRequest = require('../spec_request');
const tokenBuilder = require('../test_token').builder;
const userDb = require('../../lib/userDb');

describe('/authenticate', () => {
  describe('post', () => {
    describe('jwt authentication', () => {
      it('requires an email address', () => {
        const token = tokenBuilder({});
        return specRequest({
          url: `/authenticate?token=${token}`,
          method: 'POST'
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
        });
      });
    });

    describe('new user', () => {
      const token = tokenBuilder({email: 'test@bigwednesday.io'});

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
        const createdUser = userDb.findByEmail('test@bigwednesday.io');
        expect(createdUser.id).to.equal(newUserResponse.result.id);
      });
    });
  });
});
