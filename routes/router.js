const { Router } = require('express');

const router = Router();
const signupRoutes = require('./signup/signup');
const dashboardRoutes = require('./dashboard/dashboard');
const loginRoutes = require('./login/login');
const logoutRouter = require('./logout/logout');
const { redirectIfLoggedOut, redirectIfLoggedIn } = require('../middleware/auth');

// register routes
router.use('/signup', redirectIfLoggedIn, signupRoutes);
router.use('/dashboard', redirectIfLoggedOut, dashboardRoutes);
router.use('/login', redirectIfLoggedIn, loginRoutes);
router.use('/logout', logoutRouter);

// there won't be any home page for now
router.get('/', (req,res) => {
  res.redirect('/dashboard');
});

// error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .set('Content-Type', 'text/plain')
    .send('Whoops this is embarrasing. An unexpected error occured :(');
})


module.exports = router;