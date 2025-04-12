const mongoose = require('mongoose');

// User Database Connection
const userDB = mongoose.createConnection('mongodb+srv://gagangkurup10:omen16@clusterinternship.zup2cqv.mongodb.net/cyclelogindb?retryWrites=true&w=majority&appName=Clusterinternship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

userDB.on('connected', () => {
  console.log('User DB is connected');
});

userDB.on('error', (err) => {
  console.log('User DB connection error:', err);
});

// Period Tracking Database Connection
const periodDB = mongoose.createConnection('mongodb+srv://gagangkurup10:omen16@clusterinternship.zup2cqv.mongodb.net/periodtrackdb?retryWrites=true&w=majority&appName=Clusterinternship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

periodDB.on('connected', () => {
  console.log('Health Tracking DB is connected');
});

periodDB.on('error', (err) => {
  console.log('Health Tracking DB connection error:', err);
});

module.exports = { userDB, periodDB };
