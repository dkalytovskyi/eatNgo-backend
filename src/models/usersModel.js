const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: 'email cannot be blank'
    },
    confirm: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: 'password cannot be blank'
    },
    phoneNumber : {
      type: String, 
      default: ""
    },
    userImage: {
      type: String,
      default: ""
    }
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', usersSchema);