const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const loginModel = require('./model/logindata');
const periodModel = require('./model/perioddata');
require('./model/connection');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// =================== SIGNUP ===================
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await loginModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    await new loginModel({ name, email, password: hashedPassword }).save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// =================== SIGNIN ===================
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// =================== ADD PERIOD DATA ===================
app.post('/add-period', async (req, res) => {
  const { email, StartDate, cycle, duration } = req.body;
  if (!email || !StartDate || !cycle || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await new periodModel({ email, StartDate, cycle, duration }).save();
    res.status(201).json({ message: 'Period tracking data saved successfully' });
  } catch (error) {
    console.error('Error saving period data:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// =================== GET PERIOD DATA ===================
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

// =================== GET DIAGNOSIS DATA ===================
app.get('/get-diagnosis-data', async (req, res) => {
  const { email } = req.query;
  try {
    const diagnosisData = await diagnosisModel.find({ email }).sort({ date: -1 });
    if (!diagnosisData || diagnosisData.length === 0) {
      return res.status(404).json({ message: 'No diagnosis data found' });
    }
    res.json(diagnosisData);
  } catch (error) {
    console.error('Error fetching diagnosis data:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// =================== CHATBOT ===================
app.post('/api/chat', async (req, res) => {
  try {
    const { symptom, followupAnswer } = req.body;
    const response = await axios.post('http://localhost:5000/chatbot', { symptom, followupAnswer });
    res.json(response.data);
  } catch (error) {
    console.error('Chatbot API error:', error.message);
    res.status(500).json({ error: 'Failed to connect to chatbot.' });
  }
});

// =================== START SERVER ===================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
