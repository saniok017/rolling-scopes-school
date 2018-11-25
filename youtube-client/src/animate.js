import request from './request';
import size from './size';

function animate(next) {
  let nextPage = next;
  console.log(nextPage, next);
  const screen = document.getElementById('screen');
  const width = window.innerWidth;
  let Page = 0;
  let x0 = null;
  let locked = false;
  const ShowQuantity = size();

  function unify(e) { return e.changedTouches ? e.changedTouches[0] : e; }

  function lock(e) {
    x0 = unify(e).clientX;
    screen.classList.toggle('smooth', !(locked = true));
  }

  function drag(e) {
    e.preventDefault();
    if (locked) {
      screen.style.setProperty('--DragDistance', `${Math.round(unify(e).clientX - x0)}px`);
    }
  }

  function move(e) {
    if (locked) {
      const difference = unify(e).clientX - x0;
      const side = Math.sign(difference);
      let fraction = +(side * difference / width).toFixed(2);

      if ((Page > 0 || side < 0)
      && (Page < (screen.children.length / ShowQuantity) - 1 || side > 0)
      && fraction > 0.15) {
        screen.style.setProperty('--Page', Page -= side);
        document.getElementById('current').childNodes[0].data = `current page ${Page}`;
        if (Page > Math.round(((screen.children.length / ShowQuantity) - 1) * 0.6)) {
          nextPage = request(document.getElementById('search').value, nextPage);
        }
        fraction = 1 - fraction;
      }
      screen.style.setProperty('--DragDistance', '0px');
      screen.style.setProperty('--Fraction', fraction);
      screen.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  }
  document.getElementById('current').childNodes[0].data = `current page ${Page}`;
  document.getElementById('next').addEventListener('click', () => {
    if (Page < (screen.children.length / ShowQuantity) - 1) { screen.style.setProperty('--Page', Page += 1); }
    if (Page > Math.round(((screen.children.length / ShowQuantity) - 1) * 0.6)) {
      nextPage = request(document.getElementById('search').value, nextPage);
    }
  });
  document.getElementById('prev').addEventListener('click', () => {
    if (Page > 0) { screen.style.setProperty('--Page', Page -= 1); }
  });
  document.getElementById('start').addEventListener('click', () => {
    screen.style.setProperty('--Page', 0);
  });

  screen.addEventListener('pointerdown', lock, false);
  screen.addEventListener('pointermove', drag, false);
  screen.addEventListener('pointerup', move, false);
  screen.addEventListener('pointercancel', () => {}, false);
}

export default animate;
