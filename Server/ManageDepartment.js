const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3003;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});


app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/department_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const departmentSchema = new mongoose.Schema({
  departmentid: String,
  departmentname: String,
  designation: [String],
});

const Department = mongoose.model('Department', departmentSchema);

app.get('/department_data', async (req, res) => {
  try {
    const departments = await Department.find({}, 'departmentname designation');
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/department_data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findOneAndDelete({ departmentid: id });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/department_data/add', async (req, res) => {
  try {
    const { departmentname, designation } = req.body;

    // Check if the department with the given name already exists
    const existingDepartment = await Department.findOne({ departmentname });
    if (existingDepartment) {
      return res.status(400).json({ success: false, error: 'Department already exists' });
    }

    // Create a new department
    const newDepartment = new Department({
      departmentname,
      designation: designation.split(',').map((d) => d.trim()), // Convert string to array
    });

    await newDepartment.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.put('/department_data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentname, designation } = req.body;

    // Update the department with new values
    await Department.findOneAndUpdate({ departmentid: id }, { departmentname, designation: designation.split(',').map((d) => d.trim()) });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
