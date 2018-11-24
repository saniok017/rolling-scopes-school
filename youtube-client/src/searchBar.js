import request from './request';
import animate from './animate';

function searchBar() {
  const main = document.createElement('main');
  main.innerHTML = '<form class="form-wrapper"><input type="text" id="search" placeholder="Search for..." required><input type="submit" value="GO" id="submit"></form><section id="screen"></section><a class="free" href="http://www.freepik.com">Backgrounds designed by Freepik</a>';
  document.getElementsByTagName('body')[0].insertBefore(main, document.getElementById('entry'));
  document.getElementById('submit').addEventListener('click', (e) => {
    const screen = document.getElementById('screen');
    screen.innerHTML = '';
    request(document.getElementById('search').value);
    setTimeout(() => animate(), 500);
    e.preventDefault();
  });
  document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', '<nav><ul><li class="prev"><i class="far fa-arrow-alt-circle-left"></i></li><li class="first"></li><li class="current"></li><li class="next"><i class="far fa-arrow-alt-circle-right"></i></li></ul></nav>');
}

export default searchBar;
