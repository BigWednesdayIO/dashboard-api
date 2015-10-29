'use strict';

const joi = require('joi');
const boom = require('boom');
const userDb = require('../userDb');
const errorSchema = require('../error_schema');

const userSchema = joi.object({
  id: joi.string().required().description('User identifier.'),
  email: joi.string().required().email().description('User email address.'),
  company: joi.string().description('User company')
}).meta({
  className: 'User'
}).description('User object');

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: (request, reply) => {
      const user = userDb.findById(request.params.id);
      reply(user ? user : boom.notFound(`User ${request.params.id} does not exist`));
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: joi.string().required().description('User identifier')
        }
      },
      response: {
        failAction: process.env.RESPONSE_FAIL_ACTION || 'log',
        schema: errorSchema,
        status: {
          200: userSchema,
          404: errorSchema.description('The user was not found')
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users_{id}'
};
