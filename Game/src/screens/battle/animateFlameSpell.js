function animateFlameSpell(context, gameState) {
  const img = gameState.flameSpell;
  if (img.num === img.count) gameState.casting = false;
  else img.num += 1;
  context.drawImage(img.dom, 0, Math.round(img.height / img.count) * (img.num - 1),
    img.width, (img.height / img.count), img.x, img.y,
    img.width + 400, (img.height / img.count) + 100);
}

export default animateFlameSpell;
