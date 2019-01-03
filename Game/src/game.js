export class GameState {
  constructor() {
    this.playerName = '';
    this.monsterNames = {
      first: [
        'ugly',
        'evil',
        'big',
      ],
      second: [
        'zombie',
        'hero',
        'gnome',
      ],
      third: [
        'Tom',
        'Groomsh',
        'Man',
      ],
    };
  }

  setPlayerName(name = '') {
    this.playerName = name;
  }
}

let gameState = null;

export const setGameState = (state) => {
  gameState = state;
};

export const getGameState = () => gameState;
