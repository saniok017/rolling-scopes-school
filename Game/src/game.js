export class GameState {
  constructor() {
    this.backGround = null;
    this.playerName = '';
    this.fightBack = false;
    this.interval = false;
    this.playerHP = 100;
    this.firstKey = 49;
    this.secondKey = 50;
    this.thirdKey = 51;
    this.confirmKey = 13;
    this.readyKey = 32;
    this.casting = false;
    this.hit = false;
    this.die = false;
    this.counter = 0;
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

  increase() {
    this.counter += 1;
  }

  setCast(bool) {
    this.casting = bool;
  }

  setHit(bool) {
    this.hit = bool;
  }

  setDie(bool) {
    this.die = bool;
  }

  setControls(first, second, third, confirm, ready) {
    this.firstKey = first;
    this.secondKey = second;
    this.thirdKey = third;
    this.confirmKey = confirm;
    this.readyKey = ready;
  }

  sufferDamage(damage) {
    this.playerHP -= damage;
  }

  stopInterval(bool) {
    this.interval = bool;
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
