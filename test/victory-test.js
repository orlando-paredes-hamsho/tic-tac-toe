import chai, { expect } from 'chai';
import victory from '../src/utility/victory';

describe('claim victory', () => {
    context('receives an array that contains a winning combination', () => {
        it('returns true', () => {
    		expect(victory.claim([1, 2, 3])).to.be.true;
    	});
    });
    
    context('receives an array with too many values that contains a winning combination', () => {
        it('returns true', () => {
    		expect(victory.claim([1, 2, 3, 7])).to.be.true;
    	});
    });
	
	context('receives an array with a non-winning combination', () => {
    	it('returns false', () => {
    	    expect(victory.claim([1, 3, 7])).to.be.false;
    	});
	});
	
	context('receives an array with too many values that contains a non-winning combination', () => {
    	it('returns false', () => {
    	    expect(victory.claim([1, 3, 7, 9])).to.be.false;
    	});
	});
	
	context('receives an empty array', () => {
    	it('returns false', () => {
    	    expect(victory.claim([])).to.be.false;
    	});
	});
	
	context('receives an array with too few values', () => {
    	it('returns false', () => {
    	    expect(victory.claim([1, 2])).to.be.false;
    	});
	});
});