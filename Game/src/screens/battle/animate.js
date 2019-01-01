import wizardcasting from './backgrounds/spritemap.png';
import wizardstanding from './backgrounds/spritemap2.png';
import start from './zomb/monster';
import loadImage from './loadImage';

function animate(backGround) {
  const context = document.getElementById('canvas').getContext('2d');

  const wizard = loadImage(`${wizardstanding}`);

  function drawImage(img, x, y) {
    if (img.num >= img.count) img.num = 1;
    else img.num += 1;

    context.drawImage(img.dom, img.width * (img.num - 1),
      0, img.width, img.height, x, y, wizard.width, wizard.height);
  }

  setInterval(() => {
    context.clearRect(0, 0, wizard.width, wizard.height);
    context.drawImage(backGround, 0, 0, backGround.width, backGround.height);
    drawImage(wizard, 20, 320);
  }, 200);

  start(context);
}

export default animate;
