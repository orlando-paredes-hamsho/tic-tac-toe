import chai, { expect } from 'chai';
import make_board from '../src/make-board';

let board;

describe('Board', () => {
    context('Initial State', () => {	
		
		beforeEach('Make a new Board', () => {
			board = make_board();	
		});
		
		it('returns empty board spaces', () => {
			let spaces = board.spaces;
			for(let space in spaces){
				if(spaces.hasOwnProperty(space)) {
					expect(spaces[space]).to.not.exist;
				}
			}
		});
		
		it('has 9 board spaces', () => {
			let spaces = board.spaces;
			const board_spaces = ['1','2','3','4','5','6','7','8','9'];
			expect(Object.getOwnPropertyNames(spaces)).to.deep.equal(board_spaces);
		});
		
		it('renders the space number when the space is empty', () => {
			expect(board.render_space(1)).to.equal(1);
		});
		
		it('renders an empty board', () => {
			const empty_board = (
				'|---|---|---|\n' + 
				'| 1 | 2 | 3 |\n' +
				'|---|---|---|\n' +
				'| 4 | 5 | 6 |\n' +
				'|---|---|---|\n' +
				'| 7 | 8 | 9 |\n' +
				'|---|---|---|\n' 
			);
			expect(board.render()).to.equal(empty_board);
		});
    });
	
	context('Space wants to be occupied', () => {	
		
		beforeEach('Make a new Board', () => {
			board = make_board();	
		});
		
		context('The space is valid', () => {
			
			it('Returns success with a value of true', () => {
				expect(board.occupy({space: 1, marker: 'x'}).success).to.be.true;
			});
			
			it('Adds the respective marker to the space', () => {
				board.occupy({space: 1, marker: 'x'});
				expect(board.spaces[1]).to.equal('x');
			});
			
			it('Renders the marker on the board', () => {
				board.occupy({space: 1, marker: 'x'});
				const occupied_board = (
					'|---|---|---|\n' + 
					'| x | 2 | 3 |\n' +
					'|---|---|---|\n' +
					'| 4 | 5 | 6 |\n' +
					'|---|---|---|\n' +
					'| 7 | 8 | 9 |\n' +
					'|---|---|---|\n' 
				);
				expect(board.render()).to.equal(occupied_board);
			});
			
		});
		
		context('The space is not on the board', () => {
			
			it('Returns success with a value of false', () => {
				expect(board.occupy({space: 0, marker: 'x'}).success).to.be.false;
			});
			
			it('Returns an error message explaining why', () => {
				expect(board.occupy({space: 0, marker: 'x'}).error).to.equal('That space is not in the board');
			});
			
			it('It doesn\'t add the space to the board', () => {
				board.occupy({space: 0, marker: 'x'});
				const board_spaces = ['1','2','3','4','5','6','7','8','9'];
				expect(Object.getOwnPropertyNames(board.spaces)).to.deep.equal(board_spaces);
			});
			
			it('Doesn\'t render the marker on the board', () => {
				board.occupy({space: 0, marker: 'x'});
				const empty_board = (
					'|---|---|---|\n' + 
					'| 1 | 2 | 3 |\n' +
					'|---|---|---|\n' +
					'| 4 | 5 | 6 |\n' +
					'|---|---|---|\n' +
					'| 7 | 8 | 9 |\n' +
					'|---|---|---|\n' 
				);
				expect(board.render()).to.equal(empty_board);
			});
			
		});
		
		context('The space is already occupied', () => {
			
			it('Returns success with a value of false', () => {
				board.occupy({space: 1, marker: 'x'}); //First call
				expect(board.occupy({space: 1, marker: 'x'}).success).to.be.false;
			});
			
			it('Returns an error message explaining why', () => {
				board.occupy({space: 1, marker: 'x'}); //First call
				expect(board.occupy({space: 1, marker: 'x'}).error).to.equal('This space is already taken');
			});
			
			it('It doesn\'t change the value in the space', () => {
				board.occupy({space: 1, marker: 'x'}); //First call
				board.occupy({space: 1, marker: 'o'}); //Second call
				expect(board.spaces[1]).to.equal('x');
			});
			
			it('Doesn\'t change the marker on the board', () => {
				board.occupy({space: 1, marker: 'x'}); //First call
				board.occupy({space: 1, marker: 'o'}); //Second call
				const occupied_board = (
					'|---|---|---|\n' + 
					'| x | 2 | 3 |\n' +
					'|---|---|---|\n' +
					'| 4 | 5 | 6 |\n' +
					'|---|---|---|\n' +
					'| 7 | 8 | 9 |\n' +
					'|---|---|---|\n' 
				);
				expect(board.render()).to.equal(occupied_board);
			});
			
		});
		
    });
});