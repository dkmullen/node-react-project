const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Create (or use) a collection called 'users'
mongoose.model('users', userSchema);
