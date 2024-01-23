const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Shiva', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let adminCounter = 0; // Initialize the counter

const adminSchema = new mongoose.Schema({
  adminid: String,
  fullname: String,
  fathername: String,
  department: String,
  gender: String,
  dateofbirth: String,
  phone1: String,
  email: String,
  password: String,
  confirmpassword: String,
  address: String,
  imagePath: String,
  role: {
    type: String,
    default: 'admin'
  },
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

const generateUniqueId = () => {
  adminCounter++;
  const serialNumber = adminCounter.toString().padStart(5, '0');
  return `MTSD${serialNumber}`;
};

app.get('/admin_data/latest_id', async (req, res) => {
  try {
    const latestAdmin = await Admin.findOne({}, { adminid: 1 }).sort({ _id: -1 });
    const latestId = latestAdmin ? latestAdmin.adminid : null;
    res.status(201).json({ latestId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/admin_data/add', upload.single('image'), async (req, res) => {
  console.log(req.body); // Log the entire request body
  try {
    const newAdmin = new Admin({
      adminid: generateUniqueId(),
      fullname: req.body.fullname,
      fathername: req.body.fathername,
      department: req.body.department,
      gender: req.body.gender,
      dateofbirth: req.body.dateofbirth,
      phone1: req.body.phone1,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      address: req.body.address,
      imagePath: req.file ? req.file.path : null,
    });

    const savedAdmin = await newAdmin.save();

    res.status(200).json({ message: 'Admin added successfully', adminid: savedAdmin.adminid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { adminid, password, role } = req.body;

    const user = await Admin.findOne({ adminid });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Admin not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }

    if (user.role === role) {
      res.status(200).json({
        success: true,
        user: {
          adminid: user.adminid,
          fullname: user.fullname,
          email: user.email,
        }
      });
    } else {
      res.status(401).json({ success: false, error: 'Invalid role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});