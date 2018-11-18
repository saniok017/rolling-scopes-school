function searchBar() {
  const searchForm = '<form class="form-wrapper"><input type="text" id="search" placeholder="Search for..." required><input type="submit" value="GO" id="submit"></form>';
  document.getElementsByTagName('body')[0].innerHTML += searchForm;
}

export default searchBar;
