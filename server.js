const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const mongoClient = require('./db/mongo-client');
const router = require('./routes/router');
const config = require('./config/config');

const app = express();

// set config values
app.set('port', config.APP_PORT);

// init passport
require('./middleware/passport')(passport);

// middleware
app.set('view engine', 'ejs');
app.use(helmet());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// use session before passport to avoid issues
app.use(session({
  secret: config.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 60),
    httpOnly: true
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

function startServer() {
  app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}...`);
  });
}

// start server only if we can connect to db
mongoClient.connect()
  .then(startServer)
  .catch((err) => {
    console.err(err);
  });

// listen for unhandled exceptions
process.on('unhandledException', (err) => {
  console.log('caught unhandled exception');
  console.error(err.stack);
});
