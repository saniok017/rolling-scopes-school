import searchBar from './searchBar';
import request from './request';

searchBar();

document.getElementById('submit').addEventListener('click',
  request(document.getElementById('search').value));
