function animate() {
  const screen = document.getElementById('screen');
  const snippetQuantity = screen.children.length;
  let width = 1;
  screen.style.setProperty('--Quantity', snippetQuantity);

  function size() { width = window.innerWidth; }
  size();

  window.addEventListener('resize', size, false);

  screen.addEventListener('pointerdown', w, false);
  screen.addEventListener('pointermove', w, false);
  screen.addEventListener('pointerup', w, false);
  screen.addEventListener('pointercancel', w, false);
}

export default animate;
