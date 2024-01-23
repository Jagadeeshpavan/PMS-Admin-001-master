// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Leave', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const leaveSchema = new mongoose.Schema({
  empId: String,
  empName: String,
  empDepartment: String,
  leaveType: String,
  fromDate: String,
  toDate: String,
  comment: String,
  file: String,
});

const LeaveModel = mongoose.model('Leave', leaveSchema);

app.post('/Leave', async (req, res) => {
  const {
    empId,
    empName,
    empDepartment,
    leaveType,
    fromDate,
    toDate,
    comment,
    file,
  } = req.body;

  const newLeave = new LeaveModel({
    empId,
    empName,
    empDepartment,
    leaveType,
    fromDate,
    toDate,
    comment,
    file,
  });

  try {
    await newLeave.save();
    console.log('Data stored successfully:', newLeave);

    res.json({ status: 'Form data received and stored successfully.' });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ status: 'Error storing data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});