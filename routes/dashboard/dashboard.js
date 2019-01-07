const { Router } = require('express');
const router = Router();
const User = require('../../db/models/user/user');

router.get('/', async (req, res) => {
  const {id} = req.user;

  const user = await User.findOne({_id: id});


  res.render('dashboard', {
    email: user.name.first
  });
});

module.exports = router;