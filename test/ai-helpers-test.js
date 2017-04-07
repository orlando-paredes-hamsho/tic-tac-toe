import chai, { expect } from 'chai';
import {get_opposite_corner, get_random_corner, get_furthest_corner_from_edge} from '../src/utility/ai-helpers';

const corners = ['1', '3', '7', '9'];

describe('AI Helpers', () => {
    context('Opposite Corner', () => {
        it('returns 9 when given 1', () => {
    		expect(get_opposite_corner('1', corners)).to.equal('9');
    	});
    	
    	it('returns 7 when given 3', () => {
    		expect(get_opposite_corner('3', corners)).to.equal('7');
    	});
    	
    	it('returns 3 when given 7', () => {
    		expect(get_opposite_corner('7', corners)).to.equal('3');
    	});
    	
    	it('returns 1 when given 9', () => {
    		expect(get_opposite_corner('9', corners)).to.equal('1');
    	});
    });
    
    context('Get Furthest Corner', () => {
        it('returns 9 when given 2', () => {
    		expect(get_furthest_corner_from_edge('2')).to.equal('9');
    	});
    	
    	it('returns 9 when given 4', () => {
    		expect(get_furthest_corner_from_edge('4')).to.equal('9');
    	});
    	
    	it('returns 1 when given 6', () => {
    		expect(get_furthest_corner_from_edge('6')).to.equal('1');
    	});
    	
    	it('returns 1 when given 8', () => {
    		expect(get_furthest_corner_from_edge('8')).to.equal('1');
    	});
    	
    	it('Throws an error is its not a pair', () => {
    	    expect(get_furthest_corner_from_edge.bind(this,'5')).to.throw('This method is meant for edges (pair numbered spaces)');
    	});
    });
    
    context('Random Corner', () => {
        it('will pick a different corner over several attempts', () => {
			let corner = get_random_corner(corners), 
				different_corner = get_random_corner(corners), 
				same = true;
			while(same) {
				if(corner === different_corner) {
					different_corner = get_random_corner(corners);
				} else {
					same = false;
				}
			}
			expect(same).to.be.false;
		});
    });
});