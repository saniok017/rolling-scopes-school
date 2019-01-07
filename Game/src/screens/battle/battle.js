import $ from 'jquery';
import template from './battle.template';
import png from './backgrounds/background.png';
import animate from './animate';
import loadAudio from './loadAudio';
import fire1 from './spells/flame/flame.wav';
import monsterTurn from './fightBack';

class Battle {
  static draw(gameState) {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const backGround = new Image();
    backGround.src = png;
    backGround.onload = () => {
      canvas.width = backGround.width;
      canvas.height = backGround.height;
      context.drawImage(backGround, 0, 0, canvas.width, canvas.height);
      gameState.setBackGround(backGround);
      animate(gameState);
    };

    // $('.js-player-card .js-name').text(gameState.playerName);
  }

  static cast(taskResult, chosenCast, gameState) {
    if (taskResult) {
      gameState.casting = true;
      gameState.currentCast = chosenCast;
      gameState.sound = loadAudio(fire1);
      gameState.sound.play();
    } else {
      monsterTurn(gameState);
    }
    return new Promise((resolve) => {
      $('.js-show-player-name').on('click', () => {
        resolve(chosenCast);
      });
    });
  }

  static empty() {
    $('#battle').empty();
  }

  constructor() {
    this.player = {
      view: {
        color: 'red',
      },
    };
    this.monster = {
      view: {
        color: 'orange',
      },
    };
    this.currentState = {};
  }
}

export default Battle;
