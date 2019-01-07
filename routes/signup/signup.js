const { Router } = require('express');
const User = require('../../db/models/user/user');
const router = Router();

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res) => {
  const { email, password, fname, last } = req.body;

  try {
    let user = await User.findOne({email: email});

    // return 401 if user already exists
    if (user) {
      res.redirect('/signup?err=true');
    }

    // create new user
    user = new User({
      email: email,
      name: {
        first: fname,
        last: last
      }
    });

    // set password and save
    await user.setHash(password);
    await user.save();

    res.redirect('/login');
  }
  catch(err) {
    res.redirect('/signup?err=true');
    console.error(err.message);
  }
});

module.exports = router;
