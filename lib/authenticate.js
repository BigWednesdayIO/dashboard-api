'use strict';

const joi = require('joi');
const boom = require('boom');
const jwt = require('./jwt_signer');
const userDb = require('./userDb');
const errorSchema = require('./error_schema');

const userCredentialsSchema = joi.object({
  id: joi.string().required().description('User identifier'),
  token: joi.string().required().description('JWT for API access')
})
.meta({className: 'UserCredentials'})
.description('Authenticated user credentials');

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

      let isNewUser = false;
      let user = userDb.findByEmail(credentials.email);
      if (!user) {
        isNewUser = true;
        user = userDb.create({email: credentials.email});
      }

      const responsePayload = {
        id: user.id,
        token: jwt.sign({scopes: [`user:${user.id}`]})
      };

      const response = reply(responsePayload);

      if (isNewUser) {
        response.created(`/users/${user.id}`);
      }
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
          200: userCredentialsSchema,
          201: userCredentialsSchema
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'authenticate'
};
