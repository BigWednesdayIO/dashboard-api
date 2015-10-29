'use strict';

const joi = require('joi');
const boom = require('boom');
const userDb = require('./userDb');
const errorSchema = require('./error_schema');

exports.register = function (server, options, next) {
  server.route({
    method: 'POST',
    path: '/authenticate',
    handler: (request, reply) => {
      const credentials = request.auth.credentials;

      if (!credentials.email) {
        return reply(boom.unauthorized('No email address'));
      }

      if (credentials.email_verified !== true) {
        return reply(boom.unauthorized('Email address not verified'));
      }

      let user = userDb.findByEmail(credentials.email);
      if (!user) {
        user = userDb.create({email: credentials.email});
      }

      reply({id: user.id}).created(`/users/${user.id}`);
    },
    config: {
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
