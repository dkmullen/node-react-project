const express = require('express'),
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'),
  passport = require('passport'),
  keys = require('./config/keys');

// Don't need to assign to a var. This just makes sure these run at startup
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Attach the routes in authRoutes to the app object
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
