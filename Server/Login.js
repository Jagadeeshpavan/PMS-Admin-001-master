const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.json({ success: false, error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ success: false, error: 'Invalid password' });
    }

    const token = jwt.sign({ email, role }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
