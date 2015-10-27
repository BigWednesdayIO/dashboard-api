'use strict';

const Hapi = require('hapi');
const Swaggered = require('hapi-swaggered');
const Package = require('../package.json');
const Users = require('./users');

const plugins = [{
  register: Users
}, {
  register: Swaggered,
  options: {
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

  server.register(plugins, err => {
    if (err) {
      return callback(err);
    }

    callback(null, server);
  });
};
