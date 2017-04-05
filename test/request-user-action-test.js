import chai, { expect } from 'chai';
import request_user_action from '../src/utility/request-user-action';
import {stdin as callable_stdin } from 'mock-stdin';

const stdin = callable_stdin();

describe('request-user-action', () => {
	it('requests an action', () => {
		process.nextTick(() => stdin.send('response'));
		return request_user_action('Say response').then((response) => {
			console.assert(response === 'response');
		});
	});
});