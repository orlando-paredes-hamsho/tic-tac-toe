import chai, { expect } from 'chai';
import request_user_action from '../src/utility/request-user-action';

describe('request-user-action', function () {
  let stdin;
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });
  it('asks a question', function () {
    process.nextTick(function mockResponse() {
      stdin.send('response');
    });
    return request_user_action('question: test')
      .then(function (response) {
        console.assert(response === 'response');
      });
  });
});