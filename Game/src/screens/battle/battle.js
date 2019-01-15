/* eslint-disable no-param-reassign */
import $ from 'jquery';
import _ from 'lodash';
import template from './battle.template';
import backgroundSrc from './images/background.png';
import backgroundSrc2 from './images/background2.png';
import backgroundSrc3 from './images/background3.png';
import backgroundSrc4 from './images/background4.png';
import animate from './animate';
import loadAudio from './loadAudio';
import fireSound from './spells/flame/flame.mp3';
import novaSound from './spells/nova/nova.mp3';
import voidSound from './spells/void/void.mp3';
import monsterTurn from './fightBack';

class Battle {
  static draw(gameState) {
    const backGroundArray = [backgroundSrc, backgroundSrc2, backgroundSrc3, backgroundSrc4];
    const contentEl = document.querySelector('#content');
    contentEl.innerHTML = template;
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const backGround = new Image();
    backGround.src = backGroundArray[_.random(backGroundArray.length - 1)];
    backGround.onload = () => {
      canvas.width = backGround.width;
      canvas.height = backGround.height;
      context.drawImage(backGround, 0, 0, canvas.width, canvas.height);
      gameState.setBackGround(backGround);
      animate(gameState);
      $('.progress-bar').text(gameState.playerHP);
      $('.progress-bar').width(`${gameState.playerHP}%`);
    };
  }

  static cast(taskResult, chosenCast, gameState) {
    if (taskResult) {
      gameState.setCast(true);
      gameState.currentCast = chosenCast;
      gameState.fireSound = loadAudio(fireSound);
      gameState.novaSound = loadAudio(novaSound);
      gameState.voidSound = loadAudio(voidSound);
      if (chosenCast === 'Nova') gameState.novaSound.play();
      if (chosenCast === 'Fire') gameState.fireSound.play();
      if (chosenCast === 'Void') gameState.voidSound.play();

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
