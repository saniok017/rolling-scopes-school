import request from './request';

function searchBar() {
  const main = document.createElement('main');
  main.innerHTML = '<form class="form-wrapper"><input type="text" id="search" placeholder="Search for..." required><input type="submit" value="GO" id="submit"></form><section id="screen"></section>';
  document.getElementsByTagName('body')[0].insertBefore(main, document.getElementById('entry'));
  document.getElementById('submit').addEventListener('click', (e) => {
    const screen = document.getElementById('screen');
    screen.innerHTML = '';
    request(document.getElementById('search').value);
    e.preventDefault();
  });
}

export default searchBar;
