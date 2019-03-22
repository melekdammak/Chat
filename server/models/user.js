const mongoose = require('mongoose');
require('mongoose-type-email');
const Schema = mongoose.Schema;

// Define collection and schema for users
let user = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email, unique: true, lowercase: true
  },
  username: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('User', user);