const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    minLength: [10, 'no should have minimum 10 digits'],
    maxLength: [15, 'no should have maximum 15 digits'],
    match: [/\d{10}/, 'no should only have digits'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    default: '',
  },
  regency: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  dateReg: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
