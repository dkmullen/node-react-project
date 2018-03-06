const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  mongoose = require('mongoose');

const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  // the id below is the mongo user id
  done(err, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(err, user);
  });
});

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(err, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(err, user));
        }
      });
    }
  )
);

// Don't forget to call .save() on User. Creating doesn't save!
