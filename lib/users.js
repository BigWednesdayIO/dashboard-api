'use strict';

const Joi = require('joi');
const Boom = require('boom');
const errorSchema = require('./error_schema');

const userParametersSchema = Joi.object({
  email: Joi.string().required().email().description('User email address')
}).meta({
  className: 'UserParameters'
}).description('User parameters object');

const userSchema = userParametersSchema.concat(Joi.object({
  id: Joi.string().required().description('User identifier')
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
      reply(user ? user : Boom.notFound(`User ${request.params.id} does not exist`));
    },
    config: {
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().required().description('User identifier')
        }
      },
      response: {
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
