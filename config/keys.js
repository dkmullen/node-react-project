// Picks prod or dev

// If we are on heroku, this gets set to 'production'
// Locally it probably isn't defined at all
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // we are in development - return the dev keys!!!
  module.exports = require('./dev');
}
