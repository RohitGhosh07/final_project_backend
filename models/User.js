const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  age: {
    type: Number,
  },
  sex: {
    type: Number,
  },
  cp: {
    type: Number,
  },
  trestbps: {
    type: Number,
  },
  chol: {
    type: Number,
  },
  fbs: {
    type: Number,
  },
  restecg: {
    type: Number,
  },
  thalach: {
    type: Number,
  },
  exang: {
    type: Number,
  },
  oldpeak: {
    type: Number, // Update to Number
  },
  slope: {
    type: Number,
  },
  ca: {
    type: Number,
  },
  thal: {
    type: Number,
  },
  target: {
    type: Number,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
