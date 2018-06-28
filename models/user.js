const mongoose = require('mongoose');


const User = new  mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  }
});



module.exports = mongoose.model('User', User);