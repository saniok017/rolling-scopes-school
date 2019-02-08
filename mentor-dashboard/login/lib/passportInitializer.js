const passportInitializer = (passport, config, ...strategies) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  strategies.forEach((Strategy) => {
    passport.use(new Strategy({
      // need to change config strategy name
      clientID: config.githubAuth.GITHUB_CLIENT_ID,
      clientSecret: config.githubAuth.GITHUB_CLIENT_SECRET,
      callbackURL: config.githubAuth.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }));
  });
};

module.exports = passportInitializer;
