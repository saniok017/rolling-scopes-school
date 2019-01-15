import _ from 'lodash';
import leftArm1 from './images/leftArm.png';
import hair1 from './images/hair.png';
import head1 from './images/head.png';
import legs1 from './images/legs.png';
import rightArm1 from './images/rightArm.png';
import torso1 from './images/torso.png';
import leftArm2 from './images/leftArm2.png';
import hair2 from './images/hair2.png';
import head2 from './images/head2.png';
import legs2 from './images/legs2.png';
import rightArm2 from './images/rightArm2.png';
import torso2 from './images/torso2.png';

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
let monsterName = 'Vasya';
const leftArmParts = [leftArm1, leftArm2];
const hairParts = [hair1, hair2];
const headParts = [head1, head2];
const legsParts = [legs1, legs2];
const rightArmParts = [rightArm1, rightArm2];
const torsoParts = [torso1, torso2];
let leftArm = null;
let hair = null;
let head = null;
let legs = null;
let rightArm = null;
let torso = null;

function loadImage(name) {
  images[name] = new Image();
  images[name].onload = () => {
    resourceLoaded();
  };
  images[name].src = name;
}

function getNewName(gameState) {
  const firstNamePart = gameState.monsterNames.first[_.random(0, 2)];
  const secondNamePart = gameState.monsterNames.second[_.random(0, 2)];
  const thirdNamePart = gameState.monsterNames.third[_.random(0, 2)];
  monsterName = `${firstNamePart} ${secondNamePart} ${thirdNamePart}`;
}

function start(ctx, gameState) {
  getNewName(gameState);
  context = ctx;
  leftArm = leftArmParts[_.random(leftArmParts.length - 1)];
  loadImage(leftArm);
  legs = legsParts[_.random(legsParts.length - 1)];
  loadImage(legs);
  torso = torsoParts[_.random(torsoParts.length - 1)];
  loadImage(torso);
  rightArm = rightArmParts[_.random(rightArmParts.length - 1)];
  loadImage(rightArm);
  head = headParts[_.random(headParts.length - 1)];
  loadImage(head);
  hair = hairParts[_.random(hairParts.length - 1)];
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

function drawRay(centerX, centerY) {
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineWidth = 10;
  context.lineTo(centerX - 650, centerY);
  context.strokeStyle = 'red';
  context.stroke();
  context.closePath();
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
  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

  context.drawImage(images[leftArm], x + 40, y - 42 - breathAmt);
  context.drawImage(images[legs], x, y);
  context.drawImage(images[torso], x, y - 50);
  context.drawImage(images[head], x - 10, y - 125 - breathAmt);
  context.drawImage(images[hair], x - 13, y - 138 - breathAmt);
  context.drawImage(images[rightArm], x - 15, y - 42 - breathAmt);

  drawEllipse(x + 12, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 23, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye
  if (window.gameState.fightBack) {
    drawRay(x + 12, y - 68 - breathAmt);
    setTimeout(window.gameState.setFightBack(false), 1000);
  }

  context.font = 'bold 12px sans-serif';
  context.fillText(`${monsterName}`, x - 20, y - 150);
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
