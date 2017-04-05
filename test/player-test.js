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
				expect(player.spaces_claimed.length).to.equal(0);
			});
			
		});
		
		context('Player gets created incorrectly', () => {
			it('should throw an error', () => {
				const marker = 'z';
				expect(make_player.bind(this, marker)).to.throw('Valid marker values are \'x\' and \'o\'');
			});
		});
    });
    
    context('Player makes a move', () => {
    	beforeEach('Create player', () => {
    		player = make_player('x');
    	});
    	
    	it('should return the space and the marker', () => {
			expect(player.move(1)).to.deep.equal({ space:1, marker:'x' })
		});
    });
    
    context('Player claims a space', () => {
    	beforeEach('Create player', () => {
    		player = make_player('x');
    	});
    	
    	context('Player is successfull', () => {
    		it('adds the claimed space to the spaces_claimed array', () => {
    			player.claim_space({ success: true, space: 1 });
    			expect(player.spaces_claimed).to.include(1);
    		});
    	});
    	
    	context('Player is unsuccessfull', () => {
    		it('Throws an error', () => {
    			expect(player.claim_space.bind(player, { success: false, error: 'some error' })).to.throw('some error');
    		});
    	});
    	
    });
    
});