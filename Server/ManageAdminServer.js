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
mongoose.connect('mongodb://localhost:27017/Shiva', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const adminSchema = new mongoose.Schema({
  adminid: String,
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

const Admin = mongoose.model('Admin', adminSchema);

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
// Example backend route to handle GET request for admin_data
app.get('/admin_data', async (req, res) => {
  try {
    // Fetch admin data from the database (using MongoDB, Mongoose, etc.)
    const adminData = await Admin.find(); // Replace Admin.find() with your actual database query
    
    // Send the fetched admin data as a response
    res.status(200).json(adminData);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/admin_data/add', upload.single('image'), async (req, res) => {
  try {
    const { adminid } = req.body;
    if (adminid) {
      const updatedAdmin = await Admin.findOneAndUpdate(
        { adminid: adminid },
        { ...req.body, imagePath: req.file ? req.file.path : null },
        { new: true }
      );

      if (!updatedAdmin) {
        return res.status(404).json({ message: 'Admin not found for update' });
      }

      return res.status(200).json({ message: 'Admin updated successfully' });
    } else {
      const newAdmin = new Admin({
        ...req.body,
        department: req.body.department, // Include the department field here
        imagePath: req.file ? req.file.path : null,
      });

      await newAdmin.save();
      res.status(201).json(newAdmin);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/admin_data/:id', async (req, res) => {
  const adminId = req.params.id;
  try {
    await Admin.findOneAndDelete({ adminid: adminId });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/admin_data/:id', async (req, res) => {
  const adminId = req.params.id;
  const updatedAdminData = req.body;

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      {adminid: adminId },
      { $set: updatedAdminData },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found for update' });
    }

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5001, () => {
  console.log(`Server is running on port ${5001}`);
});