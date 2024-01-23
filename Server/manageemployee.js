const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
// const port = 5001; 

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const employeeSchema = new mongoose.Schema({
  employeeid: String,
  fullname: String,
  fathername: String,
  department: String,
  gender: String,
  dateofbirth: String,
  // maritalstatus: String,
  phone1: String,
  // phone2: String,
  email: String,
  address: String,
  // permanentaddress: String,
  imagePath: String,

});

const Employee = mongoose.model('Employee', employeeSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


// Define your routes
app.get('/employee_data', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/employee_data/add', upload.single('image'), async (req, res) => {
  try {
    const { employeeid } = req.body;
    if (employeeid) {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { employeeid: employeeid },
        { ...req.body, imagePath: req.file ? req.file.path : null },
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found for update' });
      }

      return res.status(200).json({ message: 'Employee updated successfully' });
    } else {
      const newEmployee = new Employee({
        ...req.body,
        department: req.body.department, // Include the department field here
        imagePath: req.file ? req.file.path : null,
      });

      await newEmployee.save();
      res.status(201).json(newEmployee);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/employee_data/:id', async (req, res) => {
  const employeeId = req.params.id;
  try {
    await Employee.findOneAndDelete({ employeeid: employeeId });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/employee_data/:id', async (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = req.body;

  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { employeeid: employeeId },
      { $set: updatedEmployeeData },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found for update' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5001, () => {
  console.log(`Server is running on port ${5001}`);
});