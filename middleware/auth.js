module.exports.redirectIfLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

module.exports.redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  }

  next();
};