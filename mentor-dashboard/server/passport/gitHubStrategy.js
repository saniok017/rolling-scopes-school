const GitHubStrategy = require('passport-github2').Strategy;
const config = require('../config/config.json');

const githubStrategy = new GitHubStrategy(config.githubAuth,
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  });

module.exports = githubStrategy;
