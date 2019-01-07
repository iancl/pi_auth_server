const { Router } = require('express');
const router = Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login?err=true',
    successRedirect: '/dashboard'
  }));


module.exports = router;