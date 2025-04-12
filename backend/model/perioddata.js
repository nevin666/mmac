const { periodDB } = require('./connection');
const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  email: String,
  StartDate: String,
  cycle: String,
  duration: String,
});

const PeriodData = periodDB.model('periodtrackdetails', periodSchema);
module.exports = PeriodData;
