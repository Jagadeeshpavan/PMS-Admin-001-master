const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5005;

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  password: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());

// Handle user registration
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
