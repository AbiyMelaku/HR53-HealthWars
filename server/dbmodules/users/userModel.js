var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  team: {
    type: String,
    required: false
  },

  scores: {
    type: [Number]
  },

  achievements: {
    type: [String]
  }

});

module.exports = mongoose.model( 'User', userSchema);