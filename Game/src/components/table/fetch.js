import _ from 'lodash';

export const addNewPlayer = (enother, newScore) => {
  const name = enother;
  const score = newScore;
  fetch('http://localhost:8080/quotes',
    {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': name,
        'score': score,
      }),
    })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const getResults = (gameState) => {
  fetch('http://localhost:8080/quotes',
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      gameState.data = _.reverse(_.sortBy(data, [o => o.score]));
    });
};
