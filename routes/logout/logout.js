const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;