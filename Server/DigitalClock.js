const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { format } = require('date-fns');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/employee_logs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const logSchema = new mongoose.Schema({
  employeeId: String,
  status: String,
  timestamp: String,
});

const Log = mongoose.model('Log', logSchema);

app.post('/Employee', async (req, res) => {
  try {
    const { employeeId, status } = req.body;

    const timestamp = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { timeZone: 'Asia/Kolkata' });

    const newLog = new Log({ employeeId, status, timestamp });
    await newLog.save();

    // Send the updated employee logs back to the client
    const logs = await Log.find().sort({ timestamp: 1 });
    res.status(200).json({ message: 'Log saved successfully', logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Send detailed error message
  }
});

app.get('/LoggedInEmployee', async (req, res) => {
  try {
    const loggedInEmployee = await Log.findOne().sort({ timestamp: -1 }).limit(1);

    res.status(200).json(loggedInEmployee);
  } catch (err) {
    console.error('Error in /LoggedInEmployee route:', err);  // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
