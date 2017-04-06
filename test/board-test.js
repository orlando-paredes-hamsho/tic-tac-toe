import chai, { expect } from 'chai';
import make_board from '../src/factories/make-board';

let board;

describe('Board', () => {
    context('Initial State', () => {	
		
		beforeEach('Make a new Board', () => {
			board = make_board();	
		});
		
		it('returns all board spaces as empty', () => {
			expect(board.get_empty_spaces()).to.deep.equal(Object.getOwnPropertyNames(board.get_spaces()));
		});
		
		
		it('has 9 board spaces', () => {
			let spaces = board.get_spaces();
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
	
	context('Board is full', () => {	
		
		beforeEach('Make a new Board', () => {
			board = make_board();
			board.occupy({space: 1, marker: 'x'})
			board.occupy({space: 2, marker: 'x'})
			board.occupy({space: 3, marker: 'o'})
			board.occupy({space: 4, marker: 'o'})
			board.occupy({space: 5, marker: 'o'})
			board.occupy({space: 6, marker: 'x'})
			board.occupy({space: 7, marker: 'x'})
			board.occupy({space: 8, marker: 'o'})
			board.occupy({space: 9, marker: 'x'})
		});
		
		it('returns no empty spaces', () => {
			expect(board.get_empty_spaces()).to.deep.equal([]);
		});
		
		it('renders the marker when the space is occupied', () => {
			expect(board.render_space(1)).to.equal('x');
		});
		
		it('renders a full board', () => {
			const full_board = (
				'|---|---|---|\n' + 
				'| x | x | o |\n' +
				'|---|---|---|\n' +
				'| o | o | x |\n' +
				'|---|---|---|\n' +
				'| x | o | x |\n' +
				'|---|---|---|\n' 
			);
			expect(board.render()).to.equal(full_board);
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
			
			it('returns empty spaces minus the occupied one', () => {
				board.occupy({space: 1, marker: 'x'});
				expect(board.get_empty_spaces()).to.deep.equal( ['2','3','4','5','6','7','8','9']);
			});
			
			it('Adds the respective marker to the space', () => {
				board.occupy({space: 1, marker: 'x'});
				expect(board.get_spaces()[1]).to.equal('x');
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
				expect(Object.getOwnPropertyNames(board.get_spaces())).to.deep.equal(board_spaces);
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
				expect(board.get_spaces()[1]).to.equal('x');
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