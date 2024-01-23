const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let attendanceData = []; // Assuming this array will store attendance data

// Endpoint to get attendance data based on department and date
app.get('/attendance_data', (req, res) => {
  const { departmentName, date } = req.query;
  
  // Filter attendanceData based on departmentName and date if provided
  let filteredData = attendanceData;
  
  if (departmentName && departmentName !== 'All Employees') {
    filteredData = filteredData.filter(user => user.department === departmentName);
  }
  
  if (date) {
    filteredData = filteredData.filter(user => user.date === date);
  }
  
  res.json(filteredData);
});

// Endpoint to update attendance data
app.put('/update_attendance_data', (req, res) => {
  const updatedData = req.body;
  
  // Update the attendanceData array with the updated data
  attendanceData = attendanceData.map(user => {
    const updatedUser = updatedData.find(updated => updated.slno === user.slno);
    if (updatedUser) {
      return {
        ...user,
        intime: updatedUser.intime,
        outtime: updatedUser.outtime,
        status: updatedUser.status,
      };
    }
    return user;
  });
  
  res.json({ message: 'Attendance data updated successfully' });
});

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
