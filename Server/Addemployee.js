// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');


// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/Employee', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// let employeeCounter = 0; // Initialize the counter

// const employeeSchema = new mongoose.Schema({
//   employeeid: String,
//   fullname: String,
//   fathername: String,
//   gender: String,
//   dateofbirth: String,
//   maritalstatus: String,
//   phone1: String,
//   phone2: String,
//   email: String,
//    role: String,
//   password: String,
//   confirmpassword: String,
//   address: String,
//   permanentaddress: String,
//   imagePath: String,
//   role: {
//     type: String,
//     default: 'employee'
//   },
// });

// const Employee = mongoose.model('Employee', employeeSchema);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Function to generate a unique ID in the format "MTSD0001"
// const generateUniqueId = () => {
//   employeeCounter++;
//   const serialNumber = employeeCounter.toString().padStart(4, '0');
//   return `MTSD${serialNumber}`;
// };

// app.get('/employee_data/latest_id', async (req, res) => {
//   try {
//     const latestEmployee = await Employee.findOne({}, { employeeid: 1 }).sort({ _id: -1 });
//     const latestId = latestEmployee ? latestEmployee.employeeid : null;
//     res.status(200).json({ latestId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.post('/employee_data/add', upload.single('image'), async (req, res) => {
//   try {
//     const newEmployee = new Employee({
//       employeeid: generateUniqueId(), // Generate a unique ID
//       fullname: req.body.fullname,
//       fathername: req.body.fathername,
//       gender: req.body.gender,
//       dateofbirth: req.body.dateofbirth,
//       maritalstatus: req.body.maritalstatus,
//       phone1: req.body.phone1,
//       phone2: req.body.phone2,
//       email: req.body.email,
//       password: req.body.password,
//       confirmpassword: req.body.confirmpassword,
//       address: req.body.address,
//       permanentaddress: req.body.permanentaddress,
//       imagePath: req.file ? req.file.path : null,
//     });

//     const savedEmployee = await newEmployee.save();

//     res.status(200).json({ message: 'Employee added successfully', employeeid: savedEmployee.employeeid });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Assuming you have a User model/schema defined with Mongoose
//  // Replace this with your User model import

// app.post('/login', async (req, res) => {
//   try {
//     const { employeeid, password, role } = req.body;

//     // Check if the employee exists in the database by employeeid
//     const user = await Employee.findOne({ employeeid });

//     if (!user) {
//       return res.status(401).json({ success: false, error: 'Employee not found' });
//     }

//     // Validate password - you might use a bcrypt compare method here
//     // For demonstration purposes, a simple string comparison is shown
//     if (user.password !== password) {
//       return res.status(401).json({ success: false, error: 'Invalid password' });
//     }

//     // Assuming authentication is successful
//     // Check user's role and send a success response
//     if (user.role === role) {
//       res.status(200).json({
//         success: true,
//         user: {
//           employeeid: user.employeeid,
//           fullname: user.fullname,
//           email: user.email,
//           // Add other fields you want to send to the client
//         }
//       });
//     } else {
//       res.status(401).json({ success: false, error: 'Invalid role' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




// app.listen(5001, () => {
//   console.log('Server is running on port 5001');
// });












const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let employeeCounter = 0; // Initialize the counter

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
  password: String,
  confirmpassword: String,
  address: String,
  // permanentaddress: String,
  imagePath: String,
  role: {
    type: String,
    default: 'employee'
  },
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

// Function to generate a unique ID in the format "MTSD0001"
const generateUniqueId = () => {
  employeeCounter++;
  const serialNumber = employeeCounter.toString().padStart(5, '0');
  return `MTSD${serialNumber}`;
};
app.get('/employee_data/latest_id', async (req, res) => {
  try {
    const latestEmployee = await Employee.findOne({}, { employeeid: 1 }).sort({ _id: -1 });
    const latestId = latestEmployee ? latestEmployee.employeeid : null;
    res.status(200).json({ latestId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/employee_data/add', upload.single('image'), async (req, res) => {
  console.log(req.body); // Log the entire request body
  try {
    const newEmployee = new Employee({
      employeeid: generateUniqueId(), // Generate a unique ID
      fullname: req.body.fullname,
      fathername: req.body.fathername,
      department: req.body.department,
      gender: req.body.gender,
      dateofbirth: req.body.dateofbirth,
      // maritalstatus: req.body.maritalstatus,
      phone1: req.body.phone1,
      // phone2: req.body.phone2,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      address: req.body.address,
      // permanentaddress: req.body.permanentaddress,
      imagePath: req.file ? req.file.path : null,
    });

    const savedEmployee = await newEmployee.save();

    res.status(200).json({ message: 'Employee added successfully', employeeid: savedEmployee.employeeid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assuming you have a User model/schema defined with Mongoose
// Replace this with your User model import

app.post('/login', async (req, res) => {
  try {
    const { employeeid, password, role } = req.body;

    // Check if the employee exists in the database by employeeid
    const user = await Employee.findOne({ employeeid });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Employee not found' });
    }

    // Validate password - you might use a bcrypt compare method here
    // For demonstration purposes, a simple string comparison is shown
    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }

    // Assuming authentication is successful
    // Check user's role and send a success response
    if (user.role === role) {
      res.status(200).json({
        success: true,
        user: {
          employeeid: user.employeeid,
          fullname: user.fullname,
          email: user.email,
          // Add other fields you want to send to the client
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