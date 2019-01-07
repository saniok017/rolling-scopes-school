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
  setTimeout(() => {
    document.querySelector('.js-show-player-name').click();
    resolve();
  }, 1000);
});

const monsterTurn = async (gameState) => {
  await fightBack(gameState);
  await finalizeRound();
  console.log('here');
};

export default monsterTurn;
