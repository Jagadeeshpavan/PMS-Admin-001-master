//Manage Holiday

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
  slno: Number,
  date: String,
  description: String,
});

const Holiday = mongoose.model('Holiday', holidaySchema);

// GET endpoint to fetch all holidays
app.get('/holiday_data', async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT endpoint to update multiple holidays
app.put('/holiday_data', async (req, res) => {
  try {
    const updatedHolidays = req.body;
    // Assuming req.body is an array of updated holiday objects

    const updatePromises = updatedHolidays.map(async holiday => {
      await Holiday.findOneAndUpdate({ slno: holiday.slno }, { $set: holiday });
    });

    await Promise.all(updatePromises);
    res.json({ success: true, message: 'Holidays updated successfully' });
  } catch (error) {
    console.error('Error updating holidays:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE endpoint to delete a single holiday
app.delete('/holiday_data/:description', async (req, res) => {
  try {
    const description = req.params.description;
    // Assuming you want to delete based on the description

    await Holiday.findOneAndDelete({ description });
    res.json({ success: true, message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});