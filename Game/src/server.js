/* eslint-disable consistent-return */
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line prefer-destructuring
const MongoClient = require('mongodb').MongoClient;

let db = null;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(bodyParser.json());

MongoClient.connect('mongodb://saniok:pq9173@ds251894.mlab.com:51894/first-try', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db('first-try');

  app.listen(8080, () => {
    console.log('listening on 8080');
  });

  db.collection('quotes').find().toArray((error, results) => {
    if (err) return console.log(error);
    console.log(results);
  });
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', { quotes: result });
  });
});

// https://docs.mongodb.com/manual/reference/operator/update/
app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate(
    {
      name: 'cat',
    },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    {
      _id: -1,
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    },
  );
});

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete(
    {
      name: req.body.name,
    },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({ message: 'A darth vadar quote got deleted' });
    },
  );
});

app.post('/quotes', (req, res) => {
  // eslint-disable-next-line
  db.collection('quotes').insertOne(req.body, (err, result) => { // insertOne, insertMany, updateOne, or updateMany

    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/'); // redirection need to remove
  });
});
