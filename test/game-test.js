import chai, { expect } from 'chai';
import make_game from '../src/make-game';

let game;

describe('Game', () => {
    context('Initial State', () => {	
		
		beforeEach('Make a new Game', () => {
			game = make_game();	
		});
		
		it('renders an empty board', () => {
			const empty_board = (
				'|---|---|---|\n' + 
				'|   |   |   |\n' +
				'|---|---|---|\n' +
				'|   |   |   |\n' +
				'|---|---|---|\n' +
				'|   |   |   |\n' +
				'|---|---|---|\n' 
			);
			expect(game.draw_board()).to.equal(empty_board);
		});
    });
	
});