const passport = require('passport');

module.exports = app => {
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

  app.get('/api/logout', (req, res) => {
    // A passport func that kills the cookie!
    req.logout();
    res.send('bye');
  });

  // This address can be anything
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    console.log('aaa');
  });
};
