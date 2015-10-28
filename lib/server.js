'use strict';

const Hapi = require('hapi');
const Swaggered = require('hapi-swaggered');
const Package = require('../package.json');
const Users = require('./users');
const JwtScheme = require('hapi-auth-jwt2');

const plugins = [{
  register: Users
}, {
  register: Swaggered,
  options: {
    auth: false,
    info: {
      title: 'Dashboard API',
      version: Package.version
    }
  }
}];

module.exports = callback => {
  const server = new Hapi.Server();

  server.on('request-internal', (request, event, tags) => {
    // Log response validation failures
    if (tags.error && tags.validation && tags.response) {
      console.error(`Response validation failed for ${request.method} request ${event.request} to ${request.path}: ${event.data}`);
    }
  });

  server.connection({port: 8080});

  server.register(JwtScheme, err => {
    if (err) {
      return callback(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      key: new Buffer(process.env.CLIENT_SECRET, 'base64'),
      validateFunc: (decoded, request, callback) => {
        // TODO what do we need to validate here? - has an id? is email verified?
        callback(null, true);
      },
      verifyOptions: {
        algorithms: ['HS256'],
        audience: process.env.AUDIENCE,
        issuer: 'https://bigwednesday-io.eu.auth0.com/'
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
