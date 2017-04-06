import chai, { expect } from 'chai';
import make_ai from '../src/factories/make-ai';

describe.only('Perfect AI', () => {
	context('Creating the AI', () => {
		context('When type of \'perfect\' gets passed in', () => {
			it('returns an object', () => {
				expect(make_ai('perfect')).to.be.an('object');
			});

			it('must have a type of perfect', () => {
				expect(make_ai('perfect').type).to.equal('perfect');
			});
		});
		
		context('When no type gets passed in', () => {
			it('returns an object', () => {
				expect(make_ai()).to.be.an('object');
			});

			it('defaults to perfect', () => {
				expect(make_ai().type).to.equal('perfect');
			});
		});
	});
    
});