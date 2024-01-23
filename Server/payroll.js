const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/payrollDB', { useNewUrlParser: true, useUnifiedTopology: true });

const paySlipSchema = new mongoose.Schema({
  employeeName: String,
  employeeId: String,
  accountNumber: String,
  bankName: String,
  UANNumber: String,
  workingDays: Number,
  department: String,
  designation: String,
  year: Number,
  month: String,
  houseRentAllowance: Number,
  medicalAllowance: Number,
  dearnessAllowance: Number,
  travellingAllowance: Number,
  basicSalary: Number,
  grossSalary: Number,
  netSalary: Number,
  totalAllowance: Number,
  pf: Number,
  professionalTax: Number,
  others: Number
});

const PaySlip = mongoose.model('PaySlip', paySlipSchema);

// This function will be called by the cron job to generate payslips
// const generatePayslips = async () => {
//   try {
//     // Fetch all existing employees from the database
//     const employees = await PaySlip.find();

//     for (const employee of employees) {
//       const {
//         employeeId,
//         year,
//         month,
//         houseRentAllowance,
//         medicalAllowance,
//         dearnessAllowance,
//         travellingAllowance,
//         basicSalary,
//         pf,
//         professionalTax,
//         others
//       } = employee;

//       const grossSalary =
//         parseInt(houseRentAllowance) +
//         parseInt(medicalAllowance) +
//         parseInt(dearnessAllowance) +
//         parseInt(travellingAllowance) +
//         parseInt(basicSalary);

//       const netSalary =
//         grossSalary - (parseInt(pf) + parseInt(professionalTax) + parseInt(others));

//       const totalAllowance =
//         parseInt(houseRentAllowance) +
//         parseInt(medicalAllowance) +
//         parseInt(dearnessAllowance) +
//         parseInt(travellingAllowance);

//       // Update existing payslip with the calculated values
//       employee.grossSalary = grossSalary;
//       employee.netSalary = netSalary;
//       employee.totalAllowance = totalAllowance;

//       await employee.save();
//       console.log('Updated Pay Slip:', employee);
//     }
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// };



const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Schedule the cron job to run every month on the 1st day
cron.schedule('0 0 1 * *', () => {
  console.log('Running cron job to generate payslips for the next month');
  generatePayslipsForNextMonth();
});

// Function to generate payslips for the next month
const generatePayslipsForNextMonth = async () => {
  try {
    // Fetch all existing employees from the database
    const employees = await PaySlip.find();

    for (const employee of employees) {
      const {
        employeeId,
        year,
        month,
        houseRentAllowance,
        medicalAllowance,
        dearnessAllowance,
        travellingAllowance,
        basicSalary,
        pf,
        professionalTax,
        others
      } = employee;

      // Calculate the next month
      const nextMonthIndex = (months.indexOf(month) + 1) % months.length;
      const nextMonth = months[nextMonthIndex];
      const nextYear = nextMonthIndex === 0 ? year + 1 : year;

      // Check if payslip already exists for the next month
      const existingPaySlip = await PaySlip.findOne({ employeeId, year: nextYear, month: nextMonth });

      if (!existingPaySlip) {
        const grossSalary =
          parseInt(houseRentAllowance) +
          parseInt(medicalAllowance) +
          parseInt(dearnessAllowance) +
          parseInt(travellingAllowance) +
          parseInt(basicSalary);

        const netSalary =
          grossSalary - (parseInt(pf) + parseInt(professionalTax) + parseInt(others));

        const totalAllowance =
          parseInt(houseRentAllowance) +
          parseInt(medicalAllowance) +
          parseInt(dearnessAllowance) +
          parseInt(travellingAllowance);

        // Create a new payslip for the next month
        const newPaySlipData = {
          ...employee.toObject(),  // Convert Mongoose document to plain JavaScript object
          _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the new document
          year: nextYear,
          month: nextMonth,
          grossSalary,
          netSalary,
          totalAllowance
        };

        const newPaySlip = await PaySlip.create(newPaySlipData);
        console.log('New Pay Slip for the next month:', newPaySlip);

      } else {
        console.log('Payslip already exists for the next month:', existingPaySlip);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};


// Schedule the cron job to run every month on the 1st day
// cron.schedule('* * * * *', () => {
//   console.log('Running cron job to generate payslips');
//   generatePayslips();
// });

app.post('/Add_payslip', async (req, res) => {
  try {
    const {
      employeeId,
      year,
      month,
      houseRentAllowance,
      medicalAllowance,
      dearnessAllowance,
      travellingAllowance,
      basicSalary,
      pf,
      professionalTax,
      others
    } = req.body;

    const grossSalary =
      parseInt(houseRentAllowance) +
      parseInt(medicalAllowance) +
      parseInt(dearnessAllowance) +
      parseInt(travellingAllowance) +
      parseInt(basicSalary);

    const netSalary =
      grossSalary - (parseInt(pf) + parseInt(professionalTax) + parseInt(others));

    const totalAllowance =
      parseInt(houseRentAllowance) +
      parseInt(medicalAllowance) +
      parseInt(dearnessAllowance) +
      parseInt(travellingAllowance);

    let existingPaySlip = await PaySlip.findOne({ employeeId, year, month });

    if (!existingPaySlip) {
      const newPaySlipData = {
        ...req.body,
        grossSalary,
        netSalary,
        totalAllowance
      };

      existingPaySlip = await PaySlip.create(newPaySlipData);
      console.log('New Pay Slip:', existingPaySlip);
      res.status(201).json(existingPaySlip);
    } else {
      // Update existing payslip with the calculated values
      existingPaySlip.employeeId = employeeId;
      existingPaySlip.year = year;
      existingPaySlip.month = month;
      existingPaySlip.houseRentAllowance = houseRentAllowance;
      existingPaySlip.medicalAllowance = medicalAllowance;
      existingPaySlip.dearnessAllowance = dearnessAllowance;
      existingPaySlip.travellingAllowance = travellingAllowance;
      existingPaySlip.basicSalary = basicSalary;
      existingPaySlip.pf = pf;
      existingPaySlip.professionalTax = professionalTax;
      existingPaySlip.others = others;
      existingPaySlip.grossSalary = grossSalary;
      existingPaySlip.netSalary = netSalary;
      existingPaySlip.totalAllowance = totalAllowance;

      await existingPaySlip.save();
      console.log('Updated Pay Slip:', existingPaySlip);
      res.status(200).json(existingPaySlip);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/get_payslip', async (req, res) => {
  try {
    const payslips = await PaySlip.find();
    res.status(200).json(payslips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});