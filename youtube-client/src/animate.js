function animate() {
  const screen = document.getElementById('screen');
  const snippetQuantity = screen.children.length;
  let width = 1;
  let Page = 0;
  let x0 = null;
  let locked = false;

  screen.style.setProperty('--Quantity', snippetQuantity);

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
      let halfWay = +(side * difference / width).toFixed(2);

      if ((Page > 0 || side < 0) && (Page < snippetQuantity - 1 || side > 0)) {
        screen.style.setProperty('--i', Page -= side);
        halfWay = 1 - halfWay;
      }

      screen.style.setProperty('--DragDistance', '0px');
      screen.style.setProperty('--Half', halfWay);
      screen.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  }

  function size() { width = window.innerWidth; }
  size();

  window.addEventListener('resize', size, false);

  /* screen.addEventListener('pointerdown', lock, false);
  screen.addEventListener('pointermove', drag, false);
  screen.addEventListener('pointerup', move, false);
  screen.addEventListener('pointercancel', () => {}, false); */
  screen.addEventListener('mousedown', lock, false);
  screen.addEventListener('touchstart', lock, false);

  screen.addEventListener('mousemove', drag, false);
  screen.addEventListener('touchmove', drag, false);

  screen.addEventListener('mouseup', move, false);
  screen.addEventListener('touchend', move, false);
}

export default animate;
