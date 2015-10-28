'use strict';

const joi = require('joi');

const userDb = require('./userDb');
const errorSchema = require('./error_schema');

exports.register = function (server, options, next) {
  server.auth.strategy('auth0Jwt', 'jwt', {
    key: new Buffer(process.env.CLIENT_SECRET, 'base64'),
    validateFunc: (decoded, request, callback) => {
      if (!decoded.email) {
        return callback(null, false);
      }
      callback(null, true);
    },
    verifyOptions: {
      algorithms: ['HS256'],
      audience: process.env.AUDIENCE,
      issuer: 'https://bigwednesday-io.eu.auth0.com/'
    },
    urlKey: 'token'
  });

  server.route({
    method: 'POST',
    path: '/authenticate',
    handler: (request, reply) => {
      let user = userDb.findByEmail(request.auth.credentials.email);
      if (!user) {
        user = userDb.create({email: request.auth.credentials.email});
      }

      reply({id: user.id}).created(`/users/${user.id}`);
    },
    config: {
      auth: 'auth0Jwt',
      tags: ['api'],
      validate: {
        payload: false
      },
      response: {
        failAction: process.env.RESPONSE_FAIL_ACTION || 'log',
        schema: errorSchema,
        status: {
          201: joi.object({
            id: joi.string().required().description('User identifier')
          })
          .meta({className: 'UserCredentials'})
          .description('Authenticated user credentials')
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'authenticate'
};
