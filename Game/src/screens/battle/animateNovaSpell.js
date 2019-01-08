import monsterTurn from './fightBack';

function animateNovaSpell(context, gameState) {
  const img = gameState.novaSpell;
  if (img.num === img.count) {
    gameState.setCast(false);
    gameState.novaSound.pause();
    monsterTurn(gameState);
  } else img.num += 1;
  context.drawImage(img.dom, Math.round(img.width / img.count) * (img.num - 1), 0,
    img.width / img.count, img.height, img.x, img.y,
    Math.round(img.width / img.count) + 50, img.height);
}

export default animateNovaSpell;
