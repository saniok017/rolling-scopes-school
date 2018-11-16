let searchForm = '<form class="form-wrapper"><input type="text" id="search" placeholder="Search for..." required><input type="submit" value="go" id="submit"></form>';

document.getElementsByTagName('body').innerHTML += _.template(searchForm);
