import _ from 'lodash.template';

function searchBar() {
  const searchForm = '<form class="form-wrapper"><input type="text" id="search" placeholder="Search for..." required><input type="submit" value="go" id="submit"></form>';
  document.getElementsByTagName('body')[0].innerHTML += _(searchForm);
}

export default searchBar;
