import makeSnippet from './showResults';
import addRate from './addRate';
import animate from './animate';

function request(value, pageToken) {
  let next = pageToken;
  const first = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w&type=video&part=snippet&maxResults=15&q=${value}`;
  const second = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&pageToken=${next}&q=${value}&type=video&key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w`;
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
      next = data.nextPageToken;
      itemsArr.forEach((element) => {
      //  =============================  make snippets here ========================================
        makeSnippet(element.snippet);
        ids.push(element.id.videoId);
      });
      animate();

      fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w&id=${ids}&part=snippet,statistics`)
        .then(r => r.json())
        .then((object) => {
          const statArr = Array.from(object.items);
          const statistics = [];
          statArr.forEach((element) => {
            statistics.push(element.statistics);
          });
          addRate(statistics);
          document.querySelector('.next').addEventListener('click', () => {
            request(value, next);
          });
        });
    })
    .catch((e) => {
      const error = new Error(e.statusText);
      error.response = e;
      throw error;
    });
}

export default request;
