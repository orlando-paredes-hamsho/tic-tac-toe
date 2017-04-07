import chai, { expect } from 'chai';
import game from '../src/game';
import {stdin as callable_stdin } from 'mock-stdin';

describe('Game', () => {
    
    context('Game has not booted up', () => {
        it('returns undefined for player1', () => {
            expect(game.get_config().player1).to.not.exist;
        });
        
        it('returns undefined for player2', () => {
            expect(game.get_config().player2).to.not.exist;
        });
        
        it('returns undefined for board', () => {
            expect(game.get_config().board).to.not.exist;
        });
        
        it('returns undefined for use_ai', () => {
            expect(game.get_config().use_ai).to.not.exist;
        });
    });
    
    context('Game after booting up', () => {
        context('AI Game', () => {
            beforeEach('Start the game', () => {
                game.start({ai:true});
            });
            
            it('returns has a player1', () => {
                expect(game.get_config().player1).to.exist;
            });
            
            it('returns has a player2', () => {
                expect(game.get_config().player2).to.exist;
            });
            
            it('returns has a board', () => {
                expect(game.get_config().board).to.exist;
            });
            
            it('returns true for use_ai', () => {
                expect(game.get_config().use_ai).to.be.true;
            });
        });
        context('PVP Game', () => {
            beforeEach('Start the game', () => {
                game.start({ai:false});
            });
            
            it('returns false for use_ai', () => {
                expect(game.get_config().use_ai).to.be.false;
            });
        });
    });
    
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