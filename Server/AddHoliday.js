// Add Holiday

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Damodar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const holidaySchema = new mongoose.Schema({
  date: String,
  description: String,
});

const Holiday = mongoose.model('Holiday', holidaySchema);

app.post('/holiday_data/add', async (req, res) => {
  const { date, description } = req.body;

  try {
    const newHoliday = new Holiday({
      date,
      description,
    });

    await newHoliday.save();

    res.status(201).json({ success: true, message: 'Holiday added successfully' });
  } catch (error) {
    console.error('Error adding holiday:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});