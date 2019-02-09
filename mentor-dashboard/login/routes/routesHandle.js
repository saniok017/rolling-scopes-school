const passport = require('passport');
const ensureAuthenticated = require('../lib/ensureAuthenticated');
const data = require('../../script/data/data.json');

const routesHandle = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { user: req.user });
  });

  app.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user });
  });

  app.get('/login', (req, res) => {
    res.render('login', { user: req.user });
  });

  app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => {
    });

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    });
  app.get('/data', 
  (req, res) => {
    res.send(data);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

module.exports = routesHandle;
