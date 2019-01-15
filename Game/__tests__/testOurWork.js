import { GameState } from '../src/game';

describe('Very fast start to run the program', () => {
  it('to be sure the game is fine', () => {
    const game = new GameState();
    expect(game.backGround).toBeFalsy();
  });
  it('to be sure the game is fine', () => {
    const game = new GameState();
    expect(game.interval).toBeFalsy();
  });
  it('to be sure the game is fine', () => {
    const game = new GameState();
    expect(game.die).toBeFalsy();
  });
  it('to be sure the game is fine', () => {
    const game = new GameState();
    expect(game.counter).not.toBeTruthy();
  });
  it('to be sure the game is fine', () => {
    const game = new GameState();
    expect(game.monsterNames.first).toContain('ugly');
  });
  it('to be sure the game is fine', () => {
    const game = new GameState();
    expect(game.playerName).toBe('');
  });
});
