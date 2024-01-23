const express = require('express');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const cors = require('cors');

// Initialize Express app
const app = express();

app.use(cors());
// Connect to MongoDB (make sure MongoDB server is running)
mongoose.connect('mongodb://localhost:27017/payrollData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for payslip data
const payslipSchema = new mongoose.Schema({
  // Define your schema fields here (e.g., department, designation, employee name, year, month, etc.)
  // Example fields (modify as per your needs):
  department: String,
  designation: String,
  employee_name: String,
  year: Number,
  month: String,
  // Other necessary fields for payslip data
});

// Model based on the schema
const Payslip = mongoose.model('Payrolls', payslipSchema);

// Route to get payslip data and generate PDF
app.get('/downloadPayslip', async (req, res) => {
    const { designation, employee_name, year, month } = req.query;
  
    try {
      // Query MongoDB to find payslip data based on provided parameters
      const payslipData = await Payslip.findOne({
        designation,
        employee_name,
        year,
        month,
      });
  
      if (!payslipData) {
        return res.status(404).send('Payslip data not found');
      }
  
      // Create a new PDF document using pdfkit
      const doc = new PDFDocument();
      // Generate PDF content based on the fetched payslipData and populate the document
  
      // Set appropriate headers for PDF response
      res.setHeader('Content-Disposition', `attachment; filename=payslip_${employee_name}_${month}_${year}.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
  
      // Pipe the PDF content to the response stream
      doc.pipe(res);
      // Add content to the PDF document
      doc.text('Payslip Data:'); // Example text
      // Populate the PDF with data from payslipData
  
      // Finalize the PDF document
      doc.end();
    } catch (error) {
      console.error('Error fetching payslip data:', error);
      res.status(500).send('Error fetching payslip data');
    }
  });
  
// Start the server
const PORT = 3003; // Choose any available port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
