import 'popper.js';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import $ from 'jquery';
import 'holderjs';


import { GameState, setGameState } from './game';

import Header from './components/header/header';
import Nav from './components/navigation/nav';
import Task from './components/tasks/task';

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

  const chosenCast = await Cast.getPlayerCast();
  console.log(chosenCast);
  const taskResult = await Task.testPlayer();
  console.log(taskResult);

  await Battle.cast(taskResult, chosenCast, gameState);
  // for debug - WIP
  // TODO: need to remove
  alert('round finished!'); // eslint-disable-line no-alert
  getBattleResult(gameState);
};


const startApp = () => {
  window.$ = $; // for debug

  const gameState = new GameState();
  window.gameState = gameState;
  setGameState(gameState);

  Nav.draw();
  Header.draw();
  ModalDialog.draw();


  $('.js-start-game').on('click', async () => {
    await getBattleResult(gameState);
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
