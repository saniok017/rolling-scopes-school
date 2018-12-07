function size() {
  const width = window.innerWidth;
  let ShowQuantity;
  const screen = document.getElementById('screen');
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
  return ShowQuantity;
}

export default size;
