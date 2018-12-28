import $ from 'jquery';
import template from './battle.template';
import png from './backgrounds/background.png';
import animate from './standinganimation';

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
      animate(backGround);
    };

    $('.js-player-card .js-name').text(gameState.playerName);
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
