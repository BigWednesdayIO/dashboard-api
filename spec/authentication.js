'use strict';

const specRequest = require('./spec_request');
const expect = require('chai').expect;
const jwtUtil = require('./jwt_util');

describe('authentication', () => {
  require('../lib/server')((err, server) => {
    if (err) {
      throw new Error(err);
    }

    const table = server.table()[0].table;

    table.filter(r => r.path !== '/swagger').forEach(route => {
      it(`requires token to ${route.method} to ${route.path} `, () => {
        return specRequest({
          url: route.path,
          method: route.method
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
        });
      });

      it(`requires un-expired token to ${route.method} to ${route.path} `, () => {
        const token = jwtUtil.sign({}, {expiresIn: '0'});

        return specRequest({
          url: `${route.path}?token=${token}`,
          method: route.method
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('Token expired');
        });
      });

      it(`requires correct issuer to ${route.method} to ${route.path} `, () => {
        const token = jwtUtil.sign({}, {issuer: 'http://unknown_issuer/'});

        return specRequest({
          url: `${route.path}?token=${token}`,
          method: route.method
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('Invalid token');
        });
      });

      it(`requires correct audience to ${route.method} to ${route.path} `, () => {
        const token = jwtUtil.sign({}, {audience: 'some_audience'});

        return specRequest({
          url: `${route.path}?token=${token}`,
          method: route.method
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('Invalid token');
        });
      });

      it(`requires correct algorithm to ${route.method} to ${route.path} `, () => {
        const token = jwtUtil.sign({}, {algorithm: 'HS512'});

        return specRequest({
          url: `${route.path}?token=${token}`,
          method: route.method
        })
        .then(response => {
          expect(response.statusCode).to.equal(401);
          expect(response.result.message).to.equal('Invalid token');
        });
      });
    });
  });
});
