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
import { addNewPlayer, getResults } from './components/table/fetch';

const setPlayerName = async (gameState) => {
  const playerName = await ChoosePlayerName.getNewPlayerName();

  gameState.setPlayerName(playerName);
  Nav.update(gameState);
};

const getBattleResult = async (gameState) => {
  if (gameState.playerName === '') await setPlayerName(gameState);

  Battle.draw(gameState);

  // start animation
  await pause(2000);

  const chosenCast = await Cast.getPlayerCast(gameState);

  const taskResult = await Task.testPlayer(gameState);
  if (taskResult) gameState.increase();

  await Battle.cast(taskResult, chosenCast, gameState);

  if (!gameState.die) {
    gameState.stopInterval(true);
    await pause(1000);

    getBattleResult(gameState);
    alert(`Current score is ${gameState.counter}`); // eslint-disable-line no-alert
  } else {
    await addNewPlayer(gameState.playerName, gameState.counter);
    await getResults(gameState);
    await pause(1000);
    await Table.showResults(gameState);
    alert('Well Done!'); // eslint-disable-line no-alert
  }
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
};

// check if it game page
if (document.querySelector('#content')) {
  startApp();
}
