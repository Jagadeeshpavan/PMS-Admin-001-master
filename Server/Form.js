const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/department_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB Schema
const departmentSchema = new mongoose.Schema({
  departmentname: String,
  designation: [String],
});

const DepartmentModel = mongoose.model('Department', departmentSchema);

// Function to fetch all unique department names
const getAllUniqueDepartmentNames = async () => {
  try {
    const departments = await DepartmentModel.find({}, 'departmentname');
    const departmentNames = departments.map((department) => department.departmentname);
    return Array.from(new Set(departmentNames));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// API endpoint to add a department
app.post('/department_data/add', async (req, res) => {
  try {
    const { departmentname, designation } = req.body;
    const department = new DepartmentModel({ departmentname, designation });
    await department.save();
    res.status(200).json({ message: 'Department added successfully', department });
    console.log("Received a request to add department:", req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get the details of a specific department
app.get('/department_data/:departmentname', async (req, res) => {
  try {
    const { departmentname } = req.params;
    const department = await DepartmentModel.findOne({ departmentname });
    
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.status(200).json(department);
    console.log("Sent department data:", department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get all unique department names
app.get('/department_data', async (req, res) => {
  try {
    const uniqueDepartments = await getAllUniqueDepartmentNames();
    res.status(200).json(uniqueDepartments);
    console.log("Sent department data:", uniqueDepartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
