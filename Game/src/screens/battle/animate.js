/* eslint-disable no-param-reassign */
import wizardCasting from './images/spritemap.png';
import wizardStanding from './images/spritemap2.png';
import wizardHit from './images/spritemap3.png';
import wizardDie from './images/spritemap4.png';
import flameSpell from './spells/flame/flame.png';
import novaSpell from './spells/nova/sprite sheet.png';
import voidSpell from './spells/void/void.png';
import start from './zomb/monster';
import loadImage from './loadImage';
import animateFlameSpell from './animateFlameSpell';
import animateNovaSpell from './animateNovaSpell';
import animateVoidSpell from './animateVoidSpell';

function drawImage(img, context, gameState) {
  if (img.num === img.count && gameState.casting) {
    img.num = 4;
    if (gameState.currentCast === 'Fire') animateFlameSpell(context, gameState);
    if (gameState.currentCast === 'Nova') animateNovaSpell(context, gameState);
    if (gameState.currentCast === 'Void') animateVoidSpell(context, gameState);
  }
  if (img.num === img.count && gameState.hit) {
    gameState.setHit(false);
  }
  if (img.num === img.count && gameState.die) {
    img.num = 4;
  }
  if (img.num >= img.count) img.num = 1;
  else img.num += 1;
  context.drawImage(img.dom, img.width * (img.num - 1),
    0, img.width, img.height, img.x, img.y, img.width, img.height);
}

function getState(gameState) {
  if (gameState.casting) {
    return gameState.wizardState2;
  }
  if (gameState.hit) {
    return gameState.wizardState3;
  }
  if (gameState.die) {
    return gameState.wizardState4;
  }
  return gameState.wizardState1;
}

function loadAll(gameState) {
  const horisontalPosition = 20;
  const verticalPosition = 320;
  gameState.wizardState1 = loadImage(`${wizardStanding}`, horisontalPosition, verticalPosition);
  gameState.wizardState1.width /= gameState.wizardState1.count;
  gameState.wizardState2 = loadImage(`${wizardCasting}`, horisontalPosition, verticalPosition);
  gameState.wizardState2.width /= gameState.wizardState2.count;
  gameState.wizardState3 = loadImage(`${wizardHit}`, horisontalPosition, verticalPosition);
  gameState.wizardState3.width /= gameState.wizardState3.count;
  gameState.wizardState4 = loadImage(`${wizardDie}`, horisontalPosition, verticalPosition);
  gameState.wizardState4.width /= gameState.wizardState4.count;
  gameState.flameSpell = loadImage(`${flameSpell}`, horisontalPosition + 300, verticalPosition + 20);
  gameState.flameSpell.count = 37;
  gameState.novaSpell = loadImage(`${novaSpell}`, horisontalPosition + 300, verticalPosition + 20);
  gameState.novaSpell.count = 20;
  gameState.voidSpell = loadImage(`${voidSpell}`, horisontalPosition + 500, verticalPosition - 200);
  gameState.voidSpell.count = 20;
}

function animate(gameState) {
  // eslint-disable-next-line
  const backGround = gameState.backGround;
  const context = document.getElementById('canvas').getContext('2d');
  let wizard = null;

  // refresh interval between rounds
  gameState.stopInterval(false);
  loadAll(gameState);

  const intervalListener = setInterval(() => {
    wizard = getState(gameState);
    context.drawImage(backGround, 0, 0, backGround.width, backGround.height);
    drawImage(wizard, context, gameState);
    if (gameState.interval) {
      clearInterval(intervalListener);
    }
  }, 150);

  start(context, gameState);
}

export default animate;
