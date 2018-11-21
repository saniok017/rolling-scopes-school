import makeSnippet from './showResults';
import addRate from './addRate';
import animate from './animate';

function request(value) {
  fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC4oiGzn0zSzMVlQBXlWxjSaAPcIiz--5w&type=video&part=snippet&maxResults=15&q=${value}`)
    .then(r => r.json())
    .then((data) => {
      const itemsArr = Array.from(data.items);
      const ids = [];
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
        });
    })
    .catch((e) => {
      const error = new Error(e.statusText);
      error.response = e;
      throw error;
    });
}

export default request;
