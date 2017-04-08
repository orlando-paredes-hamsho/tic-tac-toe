import chai, { expect } from 'chai';
import make_ai from '../src/factories/make-ai';

let perfect_ai; 

describe('Perfect AI', () => {
	
	context('Getting Available Moves', () => {
		beforeEach('Makes a new AI', () => {
			perfect_ai = make_ai();
		});
		
		it('logs available moves', () => {
			perfect_ai.get_move([], []);
		});
		
		it('logs available moves', () => {
			perfect_ai.get_move(['5'], ['7']);
		});
		
		it('logs available moves', () => {
			perfect_ai.get_move(['9','8'], ['5','1']);
		});
	});

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
					perfect_ai = make_ai();
					expect(perfect_ai.move({player_spaces:[],opponent_spaces:[]})).to.equal('5');
				});
			});

			context('When the board has spaces occupied', () => {
				beforeEach('Make new ai', () => {
					perfect_ai = make_ai();
				});

				it('chooses a different space', () => {
					expect(perfect_ai.move({player_spaces:[], opponent_spaces:['5']})).to.not.equal('5');
				});
			});
			
		});
		
		context('Moves after the first', () => {
			context('AI took the center', () => {
				context('The opponent took a corner', () => {
					it('Chooses the right move', () => {
						let player_spaces = ['5'], opponent_spaces = ['7'];
						expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('3');
					});
				});
				context('The opponent took one of the sides', () => {
					it('Chooses the right move', () => {
						let player_spaces = ['5'], opponent_spaces = ['8'];
						expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('1');
					});
				})
			});
			context('Opponent took the center', () => {
				it('Chooses the right move on opponent taking a corner too', () => {
					let player_spaces = ['7'], opponent_spaces = ['5','1'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('9');
				});
				
				it('Chooses the right move on opponent taking an edge too', () => {
					let player_spaces = ['7'], opponent_spaces = ['5','2'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('8');
				});
				
				it('Chooses the right move on opponent taking a corner too', () => {
					let player_spaces = ['3'], opponent_spaces = ['5','7'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('1');
				});
			});
			
			context('Win Condition Moves', () => {
				it('Chooses the offensive move if it has a win condition', () => {
					let player_spaces = ['5', '1'], opponent_spaces = ['2','4'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('9');
				});
				
				it('Chooses the offensive move if it has a win condition with too many values', () => {
					let player_spaces = ['5', '8', '1'], opponent_spaces = ['2','4'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('9');
				});
				
				it('Chooses the defensive move if the opponent has a win condition', () => {
					let player_spaces = ['7'], opponent_spaces = ['5','2'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('8');
				});
				
				it('Chooses the offensive move if both it and the opponent have win conditions', () => {
					let player_spaces = ['5', '2'], opponent_spaces = ['3', '6'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('8');
				});
			});
			
			context('Neutral Moves', () => {
				it('Chooses a corner if available', () => {
					let player_spaces = ['5'], opponent_spaces = ['3', '7'];
					expect(perfect_ai.move({player_spaces, opponent_spaces})).to.equal('1');
				});
			});
		});
	});
});