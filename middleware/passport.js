const LocalStrategy = require('passport-local');
const User = require('../db/models/user/user');

const config = {
  usernameField: 'email',
  passwordField: 'password'
};

async function authenticate(email, password, done) {
  User.findOne({email: email})
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      try {
        const valid = user.comparePassword(password);

        if (valid) {
          done(null, user);
        }
      }
      catch(err) {
        done(err);
      }
    })
    .catch((err) => {
      done(err);
    });
}

module.exports = (passport) => {
  passport.use(new LocalStrategy(config, authenticate));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({_id: id})
      done(null, {
        id: user.id
      });
    }
    catch(err) {
      done(err);
    }
  });
};