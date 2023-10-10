const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    notes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
  });
  

  
const noteSchema = new mongoose.Schema({
    note: String,
    bgColor : String,
    imageLink: String,
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
  });

const User = mongoose.model('User', userSchema);
const Note = mongoose.model('Note', noteSchema);
  
  module.exports = {
    User,
    Note
  }