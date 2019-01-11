import $ from 'jquery';
import _ from 'lodash';

import template from './task.template';
import './math/math.css';
import calculate from './math/math';
import translate from './engToRu/engToRu';
import playSound from './engToRuAudio/engToRuAudio';


class Task {
  static draw() {
    const contentEl = document.querySelector('#demoModal .modal-content');
    contentEl.innerHTML = template;

    $('#demoModal').modal({});
  }

  static empty() {
    $('#cast').empty();
  }

  static testPlayer(gameState) {
    Task.draw();
    const taskArray = [calculate, translate, playSound];
    let answer = 0;
    let result = 0;
    const task = taskArray[_.random(0, taskArray.length - 1)];
    result = task();
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === gameState.confirmKey) $('.btn-primary').click();
    });
    return new Promise((resolve) => {
      $('#demoModal').one('hidden.bs.modal', () => {
        answer = $('#answer')[0].value;
        resolve(_.isEqual(`${result}`, answer));
      });
    });
  }
}

export default Task;
