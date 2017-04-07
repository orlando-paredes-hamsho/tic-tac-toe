import chai, { expect } from 'chai';
import make_player from '../src/factories/make-player';

let player;

describe('Player', () => {
    context('Creating a player', () => {	
		context('Player gets created correctly', () => {
		
			beforeEach('Create player', () => {
	    		player = make_player('x');
	    	});
    	
			it('should have the marker that was passed in', () => {
				expect(player.marker).to.equal('x');
			});
			
			it('Has 0 claimed spaces', () => {
				expect(player.get_spaces().length).to.equal(0);
			});
			
		});
		
		context('Player gets created incorrectly', () => {
			it('should throw an error', () => {
				const marker = 'z';
				expect(make_player.bind(this, marker)).to.throw('Valid marker values are \'x\' and \'o\'');
			});
		});
    });
    
    context('Player claims a space', () => {
    	beforeEach('Create player', () => {
    		player = make_player('x');
    	});
    	
    	context('Player is successfull', () => {
    		it('adds the claimed space to the spaces_claimed array', () => {
    			player.claim_space({ success: true, space: 1 });
    			expect(player.get_spaces()).to.include(1);
    		});
    		
    		it('returns an object with a value of true for success and an empty error', () => {
    			expect(player.claim_space({ success: true, space: 1 })).to.deep.equal({success:true, error: ''});
    		});
    	});
    	
    	context('Player is unsuccessfull', () => {
    		it('returns an object with a value of false for success and an error', () => {
    			expect(player.claim_space({ success: false, error: 'some error' })).to.deep.equal({ success: false, error: 'some error' });
    		});
    	});
    	
    	context('Player is successfull, but no space is provided', () => {
    		it('returns an object with a value of false for success and an error', () => {
    			expect(player.claim_space({ success: true })).to.deep.equal({ success: false, error: 'No space was provided' });
    		});
    	});
    	
    });
    
});