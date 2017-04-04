import chai, { expect } from 'chai';
import board from '../src/board';

describe('Board', () => {
    context('Initial State', () => {		
		it('returns empty board spaces', () => {
			let spaces = board.spaces;
			for(let space in spaces){
				if(spaces.hasOwnProperty(space)) {
					expect(spaces[space]).to.equal(' ');
				}
			}
		});
		
		it('has 9 board spaces', () => {
			let spaces = board.spaces;
			const board_spaces = ['1','2','3','4','5','6','7','8','9'];
			expect(Object.getOwnPropertyNames(spaces)).to.deep.equal(board_spaces);
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
			expect(board.render()).to.equal(empty_board);
		});
    });
});