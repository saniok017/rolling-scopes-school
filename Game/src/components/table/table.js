import $ from 'jquery';
import template from './table.template';


class Table {
  static draw() {
    const contentEl = document.querySelector('#demoModal .modal-body');
    contentEl.innerHTML = template;

    $('#demoModal').modal({});
  }

  static showResults(gameState) {
    Table.draw();
    const result = {
      name: gameState.playerName,
      score: gameState.counter,
    };

    const resultString = `<tr>
    <th scope="row">1</th>
    <td class="name">${result.name}</td>
    <td class="score">${result.score}</td>
    </tr>`;

    $('tbody').html(resultString);


    return new Promise((resolve) => {
      $('#demoModal').one('hidden.bs.modal', () => {
        resolve();
      });
    });
  }
}

export default Table;
