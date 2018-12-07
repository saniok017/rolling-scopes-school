import makeSnippet from './showResults';
import addRate from './addRate';
import size from './size';

function request(value, pageToken) {
  const stash = document.getElementById('wrapper');
  const screen = document.getElementById('screen');
  const first = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w&type=video&part=snippet&maxResults=15&q=${value}`;
  const second = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&pageToken=${pageToken}&q=${value}&type=video&key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w`;
  let current;
  if (pageToken === undefined) {
    current = first;
  } else {
    current = second;
  }

  fetch(current)
    .then(r => r.json())
    .then((data) => {
      const itemsArr = Array.from(data.items);
      const ids = [];
      stash.classList.add(`${data.nextPageToken}`);

      itemsArr.forEach((element) => {
        makeSnippet(element.snippet);
        ids.push(element.id.videoId);
      });
      screen.style.setProperty('--Quantity', screen.children.length);
      size();
      window.addEventListener('resize', size, false);
      document.getElementById('nav').classList.remove('none');

      function more() {
        if (screen.classList.contains('next')) {
          screen.classList.remove('next');
          request(value, stash.classList.value);
          stash.classList = '';
        }
      }
      screen.addEventListener('transitionstart', more, false);

      fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w&id=${ids}&part=snippet,statistics`)
        .then(r => r.json())
        .then((object) => {
          const statArr = Array.from(object.items);
          const statistics = [];
          statArr.forEach((element) => {
            statistics.push(element.statistics);
          });
          addRate(statistics);
        });
    })
    .catch((e) => {
      const error = new Error(e.statusText);
      error.response = e;
      throw error;
    });
}

export default request;
