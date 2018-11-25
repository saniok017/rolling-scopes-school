import request from './request';
import animate from './animate';

function searchBar() {
  const main = document.createElement('main');
  main.innerHTML = '<form class="form-wrapper"><input type="text" id="search" placeholder="Search for..." required><input type="submit" value="GO" id="submit" class="button"></form><section id="screen"></section>';
  document.getElementsByTagName('body')[0].insertBefore(main, document.getElementById('entry'));
  document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', '<div id="wrapper"><div id="popUp" class="b-popup none"><div id="content" class="b-popup-content">current</div></div><nav class="none" id="nav"><div id="next" class="button"><i  class="far fa-arrow-alt-circle-right"></i></div><div id="current" class="button">current</div><div id="start" class="button">start</div><div id="prev" class="button"><i class="far fa-arrow-alt-circle-left"></i></div></nav></div><a class="free" href="http://www.freepik.com">Backgrounds designed by Freepik</a>');
  /* const asyn = async () => {
    await request(document.getElementById('search').value)
      .than(() => animate());
  }; */
  document.getElementById('submit').addEventListener('click', (e) => {
    const screen = document.getElementById('screen');
    screen.innerHTML = '';
    // asyn();
    request(document.getElementById('search').value);
    screen.style.setProperty('--Page', 0);
    setTimeout(() => animate(), 500);
    e.preventDefault();
  });
}

export default searchBar;

