import monsterTurn from './fightBack';

function animateFlameSpell(context, gameState) {
  const img = gameState.flameSpell;
  if (img.num === img.count) {
    gameState.setCast(false);
    gameState.fireSound.pause();
    monsterTurn(gameState);
  } else img.num += 1;
  context.drawImage(img.dom, Math.round(img.width / img.count) * (img.num - 1), 0,
    img.width / img.count, img.height, img.x, img.y,
    Math.round(img.width / img.count) + 400, img.height + 100);
}

export default animateFlameSpell;
