function animate() {
  const screen = document.getElementById('screen');
  let width = 1;
  let Page = 0;
  let x0 = null;
  let locked = false;
  let ShowQuantity = 1;

  screen.style.setProperty('--InnerWidth', `${window.innerWidth}px`);
  screen.style.setProperty('--Quantity', screen.children.length);

  function size() {
    width = window.innerWidth;
    if (width > 1400) {
      ShowQuantity = 4;
    }
    if (width > 1050 && width < 1400) {
      ShowQuantity = 3;
    }
    if (width > 700 && width < 1050) {
      ShowQuantity = 2;
    }
    if (width < 700) {
      ShowQuantity = 1;
    }
    screen.style.setProperty('--ShowQuantity', ShowQuantity);
    screen.style.setProperty('--InnerWidth', `${width}px`);
  }
  size();

  window.addEventListener('resize', size, false);

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
        /* if (Page > Math.round(((screen.children.length / ShowQuantity) - 1) * 0.6)) {
          request(document.getElementById('search').value);
          console.log(Math.round(((screen.children.length / ShowQuantity) - 1) * 0.6));
        } */
        fraction = 1 - fraction;
      }

      screen.style.setProperty('--DragDistance', '0px');
      screen.style.setProperty('--Fraction', fraction);
      screen.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  }

  screen.addEventListener('pointerdown', lock, false);
  screen.addEventListener('pointermove', drag, false);
  screen.addEventListener('pointerup', move, false);
  screen.addEventListener('pointercancel', () => {}, false);
}

export default animate;
