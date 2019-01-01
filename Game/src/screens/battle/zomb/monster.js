import leftArm from './images/leftArm.png';
import hair from './images/hair.png';
import head from './images/head.png';
import legs from './images/legs.png';
import rightArm from './images/rightArm.png';
import torso from './images/torso.png';

let context;
const images = {};
const totalResources = 6;
let numResourcesLoaded = 0;
const fps = 30;
const x = 750;
const y = 460;
const breathInc = 0.1;
let breathDir = 1;
let breathAmt = 0;
const breathMax = 2;
const breathInterval = setInterval(updateBreath, 1000 / fps);
const maxEyeHeight = 14;
let curEyeHeight = maxEyeHeight;
let eyeOpenTime = 0;
const timeBtwBlinks = 4000;
const blinkUpdateTime = 200;
const blinkTimer = setInterval(updateBlink, blinkUpdateTime);
const fpsInterval = setInterval(updateFPS, 1000);
let numFramesDrawn = 0;
let curFPS = 0;

function updateFPS() {
  curFPS = numFramesDrawn;
  numFramesDrawn = 0;
}
function loadImage(name) {
  images[name] = new Image();
  images[name].onload = function () {
    resourceLoaded();
  };
  images[name].src = name;
}

function start(ctx) {
  context = ctx;
  loadImage(leftArm);
  loadImage(legs);
  loadImage(torso);
  loadImage(rightArm);
  loadImage(head);
  loadImage(hair);
}

const loopDraw = function () {
  redraw();
  requestAnimationFrame(loopDraw);
};

function resourceLoaded() {
  numResourcesLoaded += 1;
  if (numResourcesLoaded === totalResources) {
    loopDraw();
  }
}

function drawEllipse(centerX, centerY, width, height) {
  context.beginPath();

  context.moveTo(centerX, centerY - height / 2);

  context.bezierCurveTo(
    centerX + width / 2, centerY - height / 2,
    centerX + width / 2, centerY + height / 2,
    centerX, centerY + height / 2,
  );

  context.bezierCurveTo(
    centerX - width / 2, centerY + height / 2,
    centerX - width / 2, centerY - height / 2,
    centerX, centerY - height / 2,
  );

  context.fillStyle = 'black';
  context.fill();
  context.closePath();
}

function redraw() {
  // context.clearRect(0, 0, 387, 350);
  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

  context.drawImage(images[leftArm], x + 40, y - 42 - breathAmt);
  context.drawImage(images[legs], x, y);
  context.drawImage(images[torso], x, y - 50);
  context.drawImage(images[head], x - 10, y - 125 - breathAmt);
  context.drawImage(images[hair], x - 37, y - 138 - breathAmt);
  context.drawImage(images[rightArm], x - 15, y - 42 - breathAmt);

  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye

  context.font = 'bold 12px sans-serif';
  context.fillText('fps: ' + curFPS + '/' + fps + ' (' + numFramesDrawn + ')', x, y - 150);
  ++numFramesDrawn;
}

function updateBreath() {
  if (breathDir === 1) { // breath in
    breathAmt -= breathInc;
    if (breathAmt < -breathMax) {
      breathDir = -1;
    }
  } else { // breath out
    breathAmt += breathInc;
    if (breathAmt > breathMax) {
      breathDir = 1;
    }
  }
}

function blink() {
  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
    eyeOpenTime = 0;
    curEyeHeight = maxEyeHeight;
  } else {
    setTimeout(blink, 10);
  }
}

function updateBlink() {
  eyeOpenTime += blinkUpdateTime;

  if (eyeOpenTime >= timeBtwBlinks) {
    blink();
  }
}

export default start;
