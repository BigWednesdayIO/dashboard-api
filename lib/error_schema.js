'use strict';

const joi = require('joi');

module.exports = joi.object({
  message: joi.string().description('A message explaining the error'),
  error: joi.string().description('An error message'),
  statusCode: joi.number().integer().description('An HTTP status code')
}).meta({className: 'Error'}).description('An error occured');
