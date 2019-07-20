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
    password: {
      type: String,
      required: 'password cannot be blank'
    },
    phoneNumber: {
      type: String,
      default: ""
    },
    confirm: {
      type: Boolean,
      default: false
    },
    userImage: {
        type: String,
        default: ""
    }
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', usersSchema);