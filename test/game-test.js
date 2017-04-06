import chai, { expect } from 'chai';
import game from '../src/game';

let success, current_player, next_player;

describe('Game', () => {
    context('Select Next Player Set', () => { 
        context('Success is true', () => {
            context('All parameters provided', () => {
                it('Returns the inverted player set', () => {
                    const next_player_set = game.select_next_player_set({success:true, error: ''}, {current_player:{1:1}, next_player:{2:2}});
                    expect(next_player_set).to.deep.equal({current_player:{2:2}, next_player:{1:1}})
                });
            });
            context('error is missing', () => {
                it('Returns the inverted player set', () => {
                    const next_player_set = game.select_next_player_set({success:true}, {current_player:{1:1}, next_player:{2:2}});
                    expect(next_player_set).to.deep.equal({current_player:{2:2}, next_player:{1:1}})
                });
            });
            context('either player is missing', () => {
                it('Returns the inverted player set', () => {
                    const bound_select_players = game.select_next_player_set.bind(game, {success:false}, {current_player:{1:1}});
                    expect(bound_select_players).to.throw('Mising player(s), something went wrong');
                });
            });
        });
        
        context('Success is false', () => {
            context('All parameters provided', () => {
                it('Returns the original player set', () => {
                    const next_player_set = game.select_next_player_set({success:false, error: ''}, {current_player:{1:1}, next_player:{2:2}});
                    expect(next_player_set).to.deep.equal({current_player:{1:1}, next_player:{2:2}})
                });
            });
            context('error is missing', () => {
                it('Returns the original player set', () => {
                    const next_player_set = game.select_next_player_set({success:false}, {current_player:{1:1}, next_player:{2:2}});
                    expect(next_player_set).to.deep.equal({current_player:{1:1}, next_player:{2:2}})
                });
            });
            context('either player is missing', () => {
                it('Returns the original player set', () => {
                    const bound_select_players = game.select_next_player_set.bind(game, {success:false}, {current_player:{1:1}});
                    expect(bound_select_players).to.throw('Mising player(s), something went wrong');
                });
            });
        });
    });
    /*
    resolve(player_victory, tie) {
			if(player_victory) {
				return 'victory';
			} else if(tie) {
				return 'tie';
			}
			return 'continue';
		},
    */
    context('Resolve Game', () => { 
        context('All Parameters provided', () => {
            context('Victory true, tie false', () => {
                it('returns victory', () => {
                    expect(game.resolve(true, false)).to.equal('victory');
                });                
            });
            context('Victory false, tie true', () => {
                it('returns tie', () => {
                    expect(game.resolve(false, true)).to.equal('tie');
                });                
            });
            context('Victory true, tie true', () => {
                it('returns victory', () => {
                    expect(game.resolve(true, true)).to.equal('victory');
                });                
            });
            context('Victory false, tie false', () => {
                it('returns victory', () => {
                    expect(game.resolve(false, false)).to.equal('continue');
                });                
            });
        });
        context('Missing params', () => {
            context('Victory missing, tie true', () => {
                it('returns victory', () => {
                    expect(game.resolve(null, true)).to.equal('tie');
                });                
            });
            context('Victory true, tie missing', () => {
                it('returns tie', () => {
                    expect(game.resolve(true, null)).to.equal('victory');
                });                
            });
            context('Victory missing, tie false', () => {
                it('returns victory', () => {
                    expect(game.resolve(null, false)).to.equal('continue');
                });                
            });
            context('Victory false, tie missing', () => {
                it('returns victory', () => {
                    expect(game.resolve(false, null)).to.equal('continue');
                });                
            });
            context('Victory misisng, tie missing', () => {
                it('returns tie', () => {
                    expect(game.resolve(null, null)).to.equal('continue');
                });                
            });
        });
    });
});