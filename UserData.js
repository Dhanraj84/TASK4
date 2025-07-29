const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  domain: String,
  timeSpent: Number,
});

module.exports = mongoose.model('UserData', UserDataSchema);
