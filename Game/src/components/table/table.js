import $ from 'jquery';
import template from './table.template';


class Table {
  static draw() {
    const contentEl = document.querySelector('#demoModal .modal-body');
    contentEl.innerHTML = template;
  }

  static showResults(gameState) {
    Table.draw();
    $('#demoModal').modal({});

    let resultString = '';
    gameState.data.forEach((element, index) => {
      resultString += `<tr>
    <th scope="row">${index + 1}</th>
    <td class="name">${element.name}</td>
    <td class="score">${element.score}</td>
    </tr>`;
    });

    $('tbody').html(resultString);


    return new Promise((resolve) => {
      $('#demoModal').one('hidden.bs.modal', () => {
        resolve();
      });
    });
  }
}

export default Table;
