'use strict';

const fs = require('fs');
const Path = require('path');
const Hapi = require('hapi');
const Swaggerize = require('swaggerize-hapi');

const plugins = [{
  register: require('./version')
}, {
  register: require('./login')
}, {
  register: Swaggerize,
  options: {
    api: require('../swagger.json'),
    handlers: Path.join(__dirname, './handlers')
  }
}];

module.exports = callback => {
  const server = new Hapi.Server();

  server.connection({
    port: 8080,
    tls: {
      key: fs.readFileSync('keys/privatekey.pem'),
      cert: fs.readFileSync('keys/certificate.pem')
    }
  });

  server.decorate('reply', 'error', function (err) {
    console.error(err);
    this.response(err);
  });

  server.register(plugins, err => {
    if (err) {
      return callback(err);
    }

    callback(null, server);
  });
};
