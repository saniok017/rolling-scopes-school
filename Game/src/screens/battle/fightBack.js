import $ from 'jquery';
import laser from './zomb/laser.mp3';
import loadAudio from './loadAudio';

// eslint-disable-next-line
const fightBack = gameState => new Promise((resolve) => {
  setTimeout(() => {
    gameState.setFightBack(true);
    loadAudio(laser).play();
    resolve();
  }, 1500);
});

const finalizeRound = () => new Promise((resolve) => {
  // finish current turn
  setTimeout(() => {
    document.querySelector('.js-show-player-name').click();
    resolve();
  }, 1000);
});

const monsterTurn = async (gameState) => {
  const damage = 25;
  await fightBack(gameState);
  gameState.sufferDamage(damage);
  gameState.setHit(true);
  if (gameState.playerHP <= 0) {
    gameState.setDie(true);
  }
  $('.progress-bar').text(gameState.playerHP);
  $('.progress-bar').width(`${gameState.playerHP}%`);
  await finalizeRound();
};

export default monsterTurn;
