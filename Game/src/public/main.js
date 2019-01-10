/* eslint-disable quote-props */
const update = document.getElementById('update');
const del = document.getElementById('delete');

del.addEventListener('click', () => {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': 'yoda',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      window.location.reload(true);
    });
});

update.addEventListener('click', () => {
  fetch('quotes',
    {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'name': 'Dart Vadar',
        'quote': 'I find your lack of faith disturbing.',
      }),
    })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      window.location.reload(true);
    });
});
