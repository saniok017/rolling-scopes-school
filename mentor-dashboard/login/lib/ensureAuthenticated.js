const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  // TODO need to handle redirect route
  res.redirect('/login');
  return false;
};

module.exports = ensureAuthenticated;
