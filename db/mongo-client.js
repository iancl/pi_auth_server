const mongoose = require('mongoose');
const config = require('../config/config');

// init mongoose
// const dbUrl = `mongodb://${config.DB_USER}:${config.DB_PASS}@` +
  // `${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`

const dbUrl = 'mongodb://127.0.0.1:27017/users'

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}