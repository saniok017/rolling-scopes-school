const passport = require('passport');
const ensureAuthenticated = require('../lib/ensureAuthenticated');
const data = require('../../script/data/data.json');
const path = require('path');

const routesHandle = (server, handle, app) => {
  // server.get('/', (req, res) => {
  //   res.render('index', { user: req.user });
  // });

  server.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user });
  });

  server.get('/service-worker.js', (req, res) => {
    const filePath = path.join(__dirname, '../../.next', pathname);
    console.log(filePath);
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
      res.redirect('/');
    });
    
  server.get('/data', 
    (req, res) => {
    res.send(data);
  });

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })
};

module.exports = routesHandle;
