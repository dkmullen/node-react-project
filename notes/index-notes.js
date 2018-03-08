const express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

// Tells passport, which knows some general things about auth, to use this
// new instance of GoogleStrategy, which knows the specifics of Google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // Where users coming from the Google auth process are directed
      // Could name this anything...
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

// A route handler for the GET req
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Heroku will dynamically provide port as env var; caps warns that this
// const shouldn't be changed lightly!
const PORT = process.env.PORT || 5000;
app.listen(PORT);

/* If node allowed, could use ES 2015 modules - import express from 'express'
    which comes with more power (not apparently allowed thru 8.9.4). Instead,
    the require method uses the 'common JS module'

    const app = express(); Generates a running express app; Can have multiple apps
    tho this is uncommon; app listens for requests, routes them to route handlers

    req res = js object of the incoming req and outgoing res
    res.send closes the response and sends it
    app.listen tells node to listen on 5000

    Deployment checklist:
    * Dynamic Port Binding (const.PORT = process.env.PORT || 5000)
    * Specify Node/NPM - For Heroku, specify node and npm ver in package.json
    * Specify Start Script - ... in package.json (point to this file)
    * Create .gitignore - containing at least this: node_modules
    heroku create - yields app html and git repository to push to

    What is express? A library that runs in the node runtime; has helpers to
    make dealing with HTTP traffic easier

    Grider says that if you understand middleware (which tweaks data before sending
    it to the various routes) and you understand routes, you understand the
    biggest part of what Express does.

    app.use is the way to introduce middleware

    What is PassportJS? General helpers for handling auth in Express.

    However, we also use at least one Passport Strategy, a package containing very specific
    helpers for handling auth with a specific provider (Google, FB, etc)

    Getting these from Google: First, you have to use the Google+ API, which isn't
    obvious on the site! To get these, I entered http://localhost:5000 and
    http://localhost:5000/* as the sending and recieving addresses.

    clientID - fakeID.apps.googleusercontent.com
    clientSecret - fakeSecret

    module.exports is a node thing that makes an object that can be imported in other modules

    Thoughts on Google Oauth - When someone signs in with email and pw, we track both
    and expect that each time, they provide the same creds. But when they sign in thru
    Google, the unique identifer is their Google profile id. So Google takes
    responsibility for auth, and we just get that id every time.

    Mongo is schema-lass(?) meaning each record can have different fields (name, age, etc)
    The defining characteristic of structured DB is that every record has the same
    fields, even if they are empty. HOWEVER, Mongoose DOES want a schema!

    Mongoose Class = Mongo Collection, and Mongoose
    instances of class = Mongo records
*/
