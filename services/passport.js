const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  mongoose = require('mongoose');

const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  // the id below is the mongo user id
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // proxy true defeats a problem GoogleStrategy has with a proxy like Heroku
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);

// Don't forget to call .save() on User. Creating doesn't save!
