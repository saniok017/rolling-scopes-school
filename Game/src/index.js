import 'popper.js';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import $ from 'jquery';
import 'holderjs';


import { GameState, setGameState } from './game';

import Header from './components/header/header';
import Nav from './components/navigation/nav';
import Task from './components/tasks/task';
import Table from './components/table/table';

import './index.css';
import './screens/start-page/product.css';
import ModalDialog from './components/modal-dialog/modal-dialog';
import ChoosePlayerName from './screens/choosePlayerName/choosePlayerName';
import Battle from './screens/battle/battle';
import Cast from './screens/cast/cast';

import { pause } from './utils';

const setPlayerName = async (gameState) => {
  const playerName = await ChoosePlayerName.getNewPlayerName();

  gameState.setPlayerName(playerName);
  Nav.update(gameState);
};

const getBattleResult = async (gameState) => {
  if (gameState.playerName === '') await setPlayerName(gameState);

  Battle.draw(gameState);

  // start animation
  await pause(1000);

  const chosenCast = await Cast.getPlayerCast(gameState);

  const taskResult = await Task.testPlayer(gameState);
  if (taskResult) gameState.increase();

  await Battle.cast(taskResult, chosenCast, gameState);
  // for debug - WIP
  // TODO: need to remove
  if (!gameState.die) {
    gameState.stopInterval(true);
    getBattleResult(gameState);
    alert('round finished!'); // eslint-disable-line no-alert
  }
  await pause(2000);
  await Table.showResults(gameState);
  alert('Well Done!');
};


const startApp = () => {
  const gameState = new GameState();
  window.gameState = gameState;
  setGameState(gameState);

  Nav.draw();
  Header.draw();
  ModalDialog.draw();


  $('.js-start-game').on('click', async () => {
    await getBattleResult(gameState);
  });

  window.addEventListener('keyup', (e) => {
    if (e.keyCode === gameState.firstKey) $('.js-start-game')[0].click();
    if (e.keyCode === gameState.secondKey) $('.js-start-game')[1].click();
    if (e.keyCode === gameState.thirdKey) $('.js-start-game')[2].click();
    if (e.keyCode === gameState.readyKey) $('#answer')[0].focus();
  });

  $('.js-choose-player-name-nav').on('click', async (e) => {
    e.preventDefault();
    await console.dir(gameState);
  });
};

// check if it game page
if (document.querySelector('#content')) {
  startApp();
}
