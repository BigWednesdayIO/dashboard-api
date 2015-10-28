'use strict';

const specRequest = require('./spec_request');
const expect = require('chai').expect;
const tokenBuilder = require('./test_token').builder;

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
        const token = tokenBuilder({}, {expiresIn: '0'});

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
        const token = tokenBuilder({}, {issuer: 'http://unknown_issuer/'});

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
        const token = tokenBuilder({}, {audience: 'some_audience'});

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
        const token = tokenBuilder({}, {algorithm: 'HS512'});

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
