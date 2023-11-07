const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    index:true
  },
  lastname: String,
  email: String,
  password: String,
  isAdmin: Boolean
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;


