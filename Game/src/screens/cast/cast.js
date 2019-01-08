import $ from 'jquery';
import novaSrc from './casts/nova.jpg';
import fireSrc from './casts/fire.jpg';
import voidSrc from './casts/void.jpg';
import template from './cast.template';


class Cast {
  static draw() {
    const contentEl = document.querySelector('#demoModal .modal-body');
    contentEl.innerHTML = template;

    const spellsImgArray = [novaSrc, fireSrc, voidSrc];

    $('#demoModal').modal({});
    spellsImgArray.forEach((element, index) => {
      document.querySelectorAll('.spellimg')[index].src = element;
    });
  }

  static empty() {
    $('#cast').empty();
  }

  static getPlayerCast(gameState) {
    Cast.draw();
    $(() => {
      $('[data-toggle="popover"]').popover();
    });

    let currentCast = $('.spell')[0].innerText;

    $('.spell').on('click', (e) => {
      currentCast = e.target.innerText;
    });

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === gameState.firstKey) $('.spell')[0].click();
      if (e.keyCode === gameState.secondKey) $('.spell')[1].click();
      if (e.keyCode === gameState.thirdKey) $('.spell')[2].click();
      if (e.keyCode === gameState.confirmKey) $('.cast').click();
    });

    return new Promise((resolve) => {
      $('#demoModal').one('hidden.bs.modal', () => {
        resolve(currentCast);
      });
    });
  }
}

export default Cast;
