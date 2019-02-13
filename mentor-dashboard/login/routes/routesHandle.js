const passport = require('passport');
const path = require('path');
const ensureAuthenticated = require('../lib/ensureAuthenticated');
const data = require('../../script/data/data.json');

const routesHandle = (server, handle, app) => {
  server.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user });
  });

  server.get('/service-worker.js', (req, res) => {
    const filePath = path.join(__dirname, '../../.next', '/service-worker.js');
    app.serveStatic(req, res, filePath);
  });

  server.get('/login', (req, res) => {
    res.render('login', { user: req.user });
  });

  server.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => {
    });

  server.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      const actualPage = '/';
      const queryParams = { userUrl: req.user.profileUrl };
      app.render(req, res, actualPage, queryParams);
    });

  server.get('/data',
    (req, res) => {
      res.send(data);
    });

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  server.get('*', (req, res) => handle(req, res));
};

module.exports = routesHandle;
