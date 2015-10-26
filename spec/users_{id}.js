'use strict';

const expect = require('chai').expect;
const specRequest = require('./spec_request');

describe('/users_{id}', () => {
  let createdId;
  const userForCreate = {email: 'test@bigwednesday.io'};

  beforeEach(() => {
    return specRequest({
      url: '/users',
      method: 'POST',
      payload: userForCreate
    })
    .then(response => {
      createdId = response.result.id;
    });
  });

  describe('get', () => {
    it('gets a user', () => {
      return specRequest({
        url: `/users/${createdId}`,
        method: 'GET'
      })
      .then(response => {
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.eql(Object.assign({id: createdId}, userForCreate));
      });
    });

    it('returns a 404 for invalid user id', () => {
      return specRequest({
        url: '/users/unknown_id',
        method: 'GET'
      })
      .then(response => {
        expect(response.statusCode).to.equal(404);
        expect(response.result.message).to.equal('User unknown_id does not exist');
      });
    });
  });
});
