const passport = require('passport');
const path = require('path');
const { sortedUniqBy, filter } = require('lodash');
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

  server.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    (req, res) => {
    });

  server.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      const renderPage = '/';
      let mentor;
      let trainee;
      data.forEach(
        (dataObject) => {
          if (dataObject.mentorGitHub === req.user.profileUrl) {
            mentor = dataObject.mentorFullName;
          }
          if (dataObject.studentGitHub === req.user.profileUrl) {
            trainee = dataObject.studentNickName;
          }
        },
      );
      const queryParams = {
        logineduser: req.user,
        loginedMentor: mentor,
        loginedTrainee: trainee,
      };
      app.render(req, res, renderPage, queryParams);
    });

  server.get('/data', (req, res) => {
    res.send(data);
  });

  server.get('/data/options', (req, res) => {
    const options = [];
    const mentors = sortedUniqBy(data, 'mentorFullName');
    mentors.forEach(
      ({ mentorFullName }) => {
        options.push({ value: mentorFullName, label: mentorFullName });
      },
    );
    res.send(options);
  });

  server.get('/tableData/:mentorFullName', (req, res) => {
    const tableData = filter(data,
      dataObject => dataObject.mentorFullName === req.params.mentorFullName);

    res.send(tableData);
  });

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  server.get('*', (req, res) => handle(req, res));
};

module.exports = routesHandle;
