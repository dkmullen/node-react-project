const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save();
    }
  )
);

// Don't forget to call .save() on User. Creating doesn't save!
