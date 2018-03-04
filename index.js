const express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);

// 'google' as an arg to authenticate is a built-in alias for GoogleStrategy
app.get(
  '/auth/google',
  passport.authenticate('google', {
    // This scope req is Google's language for reqesting info from user's acc.
    // There are other things we could ask for - see API
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google', {}));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
