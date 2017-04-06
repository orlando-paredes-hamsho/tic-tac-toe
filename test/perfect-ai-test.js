import chai, { expect } from 'chai';
import make_ai from '../src/factories/make-ai';
import make_board from '../src/factories/make-board';

let perfect_ai, board; 

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
	
	context('Making a move', () => {
		
		context('First Move', () => {
			context('When the board is empty', () => {
				it('chooses the 5th space', () => {
					board = make_board();
					perfect_ai = make_ai();
					expect(perfect_ai.move(board.get_empty_spaces())).to.equal(5);
				});
			});

			context('When the board has spaces occupied', () => {
				beforeEach('Make a new board', () => {
					board = make_board();
					perfect_ai = make_ai();
				});

				it('chooses a different space', () => {
					board.occupy({space: 5, marker: 'o'});
					expect(perfect_ai.move(board.get_empty_spaces())).to.not.equal(5);
				});

				it('will pick a different corner over several games', () => {
					board.occupy({space: 5, marker: 'o'});
					let corner = perfect_ai.move(board.get_empty_spaces()), 
						different_corner = perfect_ai.move(board.get_empty_spaces()), 
						same = true;
					while(same) {
						if(corner === different_corner) {
							different_corner = perfect_ai.move(board.get_empty_spaces());
						} else {
							same = false;
						}
					}
					expect(same).to.be.false;
				});
			});
		});
		
		context('Moves after the first', () => {
			context('moves with only 2 spaces taken', () => {
				context('The oponent took a corner', () => {
					it('');
				});
				context('The oponent took one of the sides', () => {
					it('');
				})
			});
		});
	});
});