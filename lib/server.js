'use strict';

const hapi = require('hapi');
const swaggered = require('hapi-swaggered');
const pkg = require('../package.json');
const jwtScheme = require('hapi-auth-jwt2');

const jwtSigner = require('./jwt_signer');
const users = require('./users');
const authenticate = require('./authenticate');

const plugins = [{
  register: users
}, {
  register: authenticate
}, {
  register: swaggered,
  options: {
    auth: false,
    info: {
      title: 'Dashboard API',
      version: pkg.version
    }
  }
}];

module.exports = callback => {
  const server = new hapi.Server();

  server.on('request-internal', (request, event, tags) => {
    // Log response validation failures
    if (tags.error && tags.validation && tags.response) {
      console.error(`Response validation failed for ${request.method} request ${event.request} to ${request.path}: ${event.data}`);
    }
  });

  server.connection({port: 8080});

  server.register(jwtScheme, err => {
    if (err) {
      return callback(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      key: new Buffer(process.env.CLIENT_SECRET, 'base64'),
      validateFunc: (decoded, request, callback) => {
        callback(null, true);
      },
      verifyOptions: {
        algorithms: ['HS256'],
        audience: jwtSigner.audience,
        issuer: jwtSigner.issuer
      },
      urlKey: 'token'
    });

    server.auth.default('jwt');

    server.register(plugins, err => {
      if (err) {
        return callback(err);
      }

      callback(null, server);
    });
  });
};
