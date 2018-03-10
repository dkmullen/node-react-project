// Picks prod or dev

// If we are on heroku, this gets set to 'production'
// Locally it probably isn't defined at all
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
