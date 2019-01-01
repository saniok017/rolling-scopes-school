import $ from 'jquery';

import template from './cast.template';


class Cast {
  static draw() {
    const contentEl = document.querySelector('#demoModal .modal-body');
    contentEl.innerHTML = template;

    $('#demoModal').modal({});
  }

  static empty() {
    $('#cast').empty();
  }

  static getPlayerCast() {
    Cast.draw();
    $(() => {
      $('[data-toggle="popover"]').popover();
    });

    let currentCast = $('.spell')[0].innerText;

    $('.spell').on('click', (e) => {
      currentCast = e.target.innerText;
    });

    return new Promise((resolve) => {
      $('#demoModal').on('hidden.bs.modal', () => {
        resolve(currentCast);
      });
    });
  }
}

export default Cast;
