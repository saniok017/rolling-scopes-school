import monsterTurn from './fightBack';

function animateFlameSpell(context, gameState) {
  const img = gameState.flameSpell;
  if (img.num === img.count) {
    gameState.setCast(false);
    gameState.fireSound.pause();
    monsterTurn(gameState);
  } else img.num += 1;
  context.drawImage(img.dom, 0, Math.round(img.height / img.count) * (img.num - 1),
    img.width, (img.height / img.count), img.x, img.y,
    img.width + 400, (img.height / img.count) + 100);
}

export default animateFlameSpell;
