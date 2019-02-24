const passport = require('passport');
const path = require('path');
const { sortedUniqBy, filter } = require('lodash');
const ensureAuthenticated = require('../lib/ensureAuthenticated');
const data = require('../../script/data/data.json');
const tasks = require('../../script/data/tasks.json');
const makeTableData = require('../lib/makeTableData');
const BD = require('../config/BD');

const routesHandle = (server, handle, app) => {
  server.get('/user', ensureAuthenticated, (req, res) => {
    const ID = req.user.id;
    res.send({ user: req.user, mentor: BD.get(ID) });
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
      const ID = req.user.id;

      data.forEach(
        (dataObject) => {
          if (dataObject.mentorGitHub === req.user.profileUrl
            || dataObject.studentGitHub === req.user.profileUrl) {
            BD.set(ID, dataObject.mentorFullName);
          }
        },
      );
      const queryParams = {
        logineduser: req.user,
        loginedMentor: BD.get(ID),
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
    res.send({ options, tasks });
  });

  server.get('/tableData/:mentorFullName', (req, res) => {
    const mentorData = filter(data,
      dataObject => dataObject.mentorFullName === req.params.mentorFullName);
    const tableData = makeTableData(mentorData);
    res.send(tableData);
  });

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  server.get('*', (req, res) => handle(req, res));
};

module.exports = routesHandle;
