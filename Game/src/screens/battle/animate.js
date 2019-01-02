import wizardCasting from './backgrounds/spritemap.png';
import wizardStanding from './backgrounds/spritemap2.png';
import flameSpell from './spells/flame.png';
import start from './zomb/monster';
import loadImage from './loadImage';
import animateFlameSpell from './animateFlameSpell';

function drawImage(img, context, gameState) {
  if (img.num === img.count && gameState.casting) {
    img.num = 4;
    if (gameState.currentCast === 'Fire') animateFlameSpell(context, gameState);
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
  return gameState.wizardState1;
}

function animate(gameState) {
  const backGround = gameState.background;
  const context = document.getElementById('canvas').getContext('2d');
  let wizard = null;
  const horisontalPosition = 20;
  const verticalPosition = 320;
  gameState.wizardState1 = loadImage(`${wizardStanding}`, horisontalPosition, verticalPosition);
  gameState.wizardState1.width /= gameState.wizardState1.count;
  gameState.wizardState2 = loadImage(`${wizardCasting}`, horisontalPosition, verticalPosition);
  gameState.wizardState2.width /= gameState.wizardState2.count;
  gameState.flameSpell = loadImage(`${flameSpell}`, horisontalPosition + 300, verticalPosition + 20);
  gameState.flameSpell.count = 37;

  setInterval(() => {
    wizard = getState(gameState);
    context.drawImage(backGround, 0, 0, backGround.width, backGround.height);
    drawImage(wizard, context, gameState);
  }, 200);

  start(context);
}

export default animate;
