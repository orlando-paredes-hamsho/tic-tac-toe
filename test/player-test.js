import chai, { expect } from 'chai';
import make_player from '../src/make-player';

let player;

describe('Player', () => {
    context('Creating a player', () => {	
		context('Player gets created correctly', () => {
			it('should have the marker that was passed in', () => {
				const marker = 'x';
				player = make_player({marker});
				expect(player.marker).to.equal(marker);
			});
		});
		
		context('Player gets created incorrectly', () => {
			it('should throw an error', () => {
				const marker = 'z';
				expect(make_player.bind(this, {marker})).to.throw('Valid marker values are \'x\' and \'o\'');
			});
		});
    });
});