'use strict';

const expect = require('chai').expect;
const specRequest = require('../spec_request');
const jwtUtil = require('../jwt_util');
const userDb = require('../../lib/userDb');

describe('/authenticate', () => {
  describe('post', () => {
    describe('jwt validation', () => {
      it('requires an email address', () => {
        const token = jwtUtil.sign({email_verified: true});
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
        const token = jwtUtil.sign({email: 'unverified_user@bigwednesday.io'});
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
        const token = jwtUtil.sign({email: 'unverified_user@bigwednesday.io', email_verified: 'yes'});
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
      const token = jwtUtil.sign({email: 'new_user@bigwednesday.io', email_verified: true});
      let newUserResponse;

      before(() => {
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

      it('token has user scope', () => {
        const responseToken = jwtUtil.verify(newUserResponse.result.token);
        expect(responseToken.scope).to.eql([`user:${newUserResponse.result.id}`]);
      });

      it('persists user', () => {
        const createdUser = userDb.findByEmail('new_user@bigwednesday.io');
        expect(createdUser.id).to.equal(newUserResponse.result.id);
      });
    });

    describe('existing user', () => {
      const token = jwtUtil.sign({email: 'existing_user@bigwednesday.io', email_verified: true});

      let existingUser;

      before(() => {
        userDb.create({email: 'existing_user@bigwednesday.io'});

        return specRequest({
          url: `/authenticate?token=${token}`,
          method: 'POST'
        })
        .then(response => {
          existingUser = response;
        });
      });

      it('returns HTTP 200', () => {
        expect(existingUser.statusCode).to.equal(200);
      });

      it('returns user id', () => {
        expect(existingUser.result.id).to.be.ok;
      });

      it('token has user scope', () => {
        const responseToken = jwtUtil.verify(existingUser.result.token);
        expect(responseToken.scope).to.eql([`user:${existingUser.result.id}`]);
      });
    });
  });
});
