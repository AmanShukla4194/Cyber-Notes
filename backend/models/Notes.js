const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

  user : { // this is is basically linking that which user is available in a other model which is User.js here
    // which user id is going to come from User.js in this user here which ever entry is present in User.js
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  title : {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  },
  tag : {
    type: String, 
    default: "General"
  },
  date : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes', NotesSchema);