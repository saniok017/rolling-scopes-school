import $ from 'jquery';
import template from './battle.template';

import png from './backgrounds/background.png';

class Battle {
  static draw(gameState) {
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;
    const canvas = document.getElementById('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const context = canvas.getContext('2d');
    const backGround = new Image();
    backGround.src = png;
    console.log(backGround.src);
    backGround.onload = function () {
      context.drawImage(backGround, 0, 0, 960, 540);
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
