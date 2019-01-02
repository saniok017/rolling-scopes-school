import $ from 'jquery';
import _ from 'lodash';

import template from './math/math.template';
import './math/math.css';


class Task {
  static draw() {
    const contentEl = document.querySelector('#demoModal .modal-content');
    contentEl.innerHTML = template;

    $('#demoModal').modal({});
  }

  static empty() {
    $('#cast').empty();
  }

  static testPlayer() {
    Task.draw();
    let answer = 0;
    let result = 0;
    const integer1 = _.random(0, 999);
    const integer2 = _.random(0, 999);
    if ((_.random(0, 1)) === 0) {
      result = integer1 + integer2;
      $('#math')[0].innerText = `${integer1} + ${integer2} ${result}`;
    } else {
      result = integer1 - integer2;
      $('#math')[0].innerText = `${integer1} - ${integer2} ${result}`;
    }

    return new Promise((resolve) => {
      $('#demoModal').on('hidden.bs.modal', () => {
        answer = $('#answer')[0].value;
        resolve(_.isEqual(`${result}`, answer));
      });
    });
  }
}

export default Task;
