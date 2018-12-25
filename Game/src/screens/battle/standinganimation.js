import wizardUrl from './backgrounds/spritemap.png';

function animate(backGround) {
  const context = document.getElementById('canvas').getContext('2d');

  const wizard = loadImage(`${wizardUrl}`, 387, 350, 5);

  setInterval(() => {
    context.clearRect(0, 0, 387, 350);
    context.drawImage(backGround, 0, 0, backGround.width, backGround.height);
    drawImage(wizard, 0, 150);
  }, 200);

  function drawImage(img, x, y) {
    if (img.num >= img.count) img.num = 1;
    else img.num += 1;

    context.drawImage(img.dom, img.width * (img.num - 1), 0, img.width, img.height, x, y, 387, 350);
  }

  function loadImage(path, width, height, count) {
    const image = document.createElement('img');

    const result = {
      dom: image,
      width: width,
      height: height,
      count: count,
      loaded: false,
      num: 1,
    };

    image.onload = function () {
      // image.style.display = 'none';
      result.loaded = true;
    };
    image.src = path;

    return result;
  }
}

export default animate;
