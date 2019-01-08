import $ from 'jquery';
import _ from 'lodash';

import template from './task.template';
import './math/math.css';
import calculate from './math/math';
import translate from './engToRu/engToRu';


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
    const taskArray = [calculate(), translate()];
    Task.draw();
    let answer = 0;
    let result = 0;
    result = taskArray[_.random(0, taskArray.length)];

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
