'use strict';

const bell = require('bell');

exports.register = (server, options, next) => {
  server.register(bell, err => {
    if (err) {
      console.error('Failed to register bell plugin.');
      throw err;
    }

    server.auth.strategy('twitter', 'bell', {
      provider: 'twitter',
      password: 'password',
      clientId: 'cXO3Hz4HtPCiJCgwNerKomy98',
      clientSecret: 'RHYEFDGFNrVXHmvCHlYcf9Bhjn2l29nu8jc5lpCPJThcrXHz8Z'
    });

    server.route({
      method: ['GET', 'POST'],
      path: '/twitter-login',
      config: {
        auth: 'twitter',
        handler: (request, reply) => {
          if (!request.auth.isAuthenticated) {
            return reply(`Authentication failed due to: ${request.auth.error.message}`);
          }

          reply.redirect('http://bigwednesday.io/dashboard');
        }
      }
    });

    next();
  });
};

exports.register.attributes = {
  name: 'login'
};
