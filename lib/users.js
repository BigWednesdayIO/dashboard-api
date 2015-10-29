'use strict';

const joi = require('joi');
const boom = require('boom');
const errorSchema = require('./error_schema');

const userParametersSchema = joi.object({
  email: joi.string().required().email().description('User email address'),
  company: joi.string().description('User company')
}).meta({
  className: 'UserParameters'
}).description('User parameters object');

const userSchema = userParametersSchema.concat(joi.object({
  id: joi.string().required().description('User identifier')
})).meta({
  className: 'User'
});

let userId = 1;

const usersDb = {};

exports.register = function (server, options, next) {
  server.route({
    method: 'POST',
    path: '/users',
    handler: (request, reply) => {
      const id = (userId++).toString();
      usersDb[id] = Object.assign({id}, request.payload);
      reply(usersDb[id]).created(`/users/${id}`);
    },
    config: {
      tags: ['api'],
      validate: {
        payload: userParametersSchema.description('The user to be created')
      },
      response: {
        failAction: process.env.RESPONSE_FAIL_ACTION || 'log',
        schema: errorSchema,
        status: {
          201: userSchema.description('The created user')
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: (request, reply) => {
      const user = usersDb[request.params.id];
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
  name: 'users'
};
