const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginModel = require('./model/logindata');
require('./model/connection'); // Corrected path to connection.js
const periodModel = require('./model/perioddata'); // Import the period model

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Signup API
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await loginModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user
    const newUser = new loginModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Signin API
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received Signin Data:', req.body); // Log to see the incoming data
  
    try {
      const user = await loginModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
// Save Period Data API
app.post('/add-period', async (req, res) => {
  const { email, StartDate, cycle, duration } = req.body;

  // Check if all fields are present
  if (!email || !StartDate || !cycle || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newPeriod = new periodModel({ email, StartDate, cycle, duration });
    await newPeriod.save();
    res.status(201).json({ message: 'Period tracking data saved successfully' });
  } catch (error) {
    console.error('Error saving period data:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Fetch Period Data API
app.get('/get-period-data', async (req, res) => {
  const { email } = req.query;

  try {
    const periodData = await periodModel.findOne({ email }).sort({ StartDate: -1 });
    if (!periodData) {
      return res.status(404).json({ message: 'No period data found' });
    }
    res.json(periodData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
