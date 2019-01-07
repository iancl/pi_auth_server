const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt')
const config = require('../../../config/config');

// crete schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  hash: {
    type: String,
    required: true
  }
});

// create indexes
userSchema.indexes({
  email: 1
}, {
  unique: true
});

// add methods
userSchema.methods.comparePassword = async function(password) {
  try {
    return compare(password, this.hash);
  }
  catch(err) {
    throw err;
  }
};

userSchema.methods.setHash = async function(password) {

  try {
    this.hash = await hash(password, config.SALT_ROUNDS);
  }
  catch(err) {
    throw err;
  }
};

module.exports = model('user', userSchema);