export class GameState {
  constructor() {
    this.backGround = null;
    this.playerName = '';
    this.fightBack = false;
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

  setFightBack(bool) {
    this.fightBack = bool;
  }

  setBackGround(backGround) {
    this.backGround = backGround;
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
