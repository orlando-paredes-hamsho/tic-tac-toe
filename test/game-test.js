import chai, { expect } from 'chai';
import game from '../src/game';

let success, current_player, next_player;

describe('Game', () => {
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