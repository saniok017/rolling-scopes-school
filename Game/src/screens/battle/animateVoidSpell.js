import monsterTurn from './fightBack';

function animateVoidSpell(context, gameState) {
  const img = gameState.voidSpell;
  if (img.num === img.count) {
    gameState.setCast(false);
    gameState.voidSound.pause();
    monsterTurn(gameState);
  } else img.num += 1;
  context.drawImage(img.dom, Math.round(img.width / img.count) * (img.num - 1), 0,
    img.width / img.count, img.height, img.x, img.y,
    img.width / img.count, img.height);
}

export default animateVoidSpell;
