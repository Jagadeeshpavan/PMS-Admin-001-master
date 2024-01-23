import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../../components/Payroll/DisplaySalaryData.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../Helper/Helper';


Modal.setAppElement('#root');
const DisplayPaySlipData = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState('');


  useEffect(() => {
    const fetchEmployeePayslips = async () => {
      try {
        const loggedInEmployee = JSON.parse(localStorage.getItem('loggedInEmployee'));

        const response = await axios.get(`${BASE_URL}/get_employee_payslips?employeeId=${loggedInEmployee.employeeid}`);
    
        
        setSalaryData(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeePayslips();
  }, []);


  useEffect(() => {

    const filtered = salaryData.filter((item) => {
      const employeeId = item.employeeId || '';
      return employeeId.toLowerCase().includes(filterValue.toLowerCase());
    });
    setFilteredData(filtered);
  }, [filterValue, salaryData]);
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const downloadAsPDF = (employeeData) => {


    const doc = new jsPDF();

    const labelWidth = 80;
    //  const logoUrl = 'https://pbs.twimg.com/profile_images/819851417301159936/BGt4PwUh_400x400.jpg';
    const logoUrl = 'data:image/png;base64,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'; // Provide the path or URL to your logo image
    const addImageOptions = {
      width: 40, // Set the width of the image in the PDF
      height: 23, // Set the height of the image in the PDF
    };
    const startYPos = 50; // Initial Y position for tables
    let currentYPos = startYPos;
    const imageX = 5; // X position of the image
    const imageY = 5; // Y position of the image
    doc.addImage(logoUrl, 'JPEG', imageX, imageY, addImageOptions.width, addImageOptions.height);


    const companyName = 'Matrical Technologies'; // Replace 'Your Company Name' with the actual company name
    const companyAddress = "First Floor, Raghvendra, Complex, Remco Bhel Layout, BEML Layout 3rd Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098, www.matrical.in";

    // Add company name centered at the top of the PDF with bold font
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(companyName, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Split address into lines
    const addressLines = doc.splitTextToSize(companyAddress, doc.internal.pageSize.getWidth() - 55);

    // Display address on the left side of the PDF
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    addressLines.forEach((line, index) => {
      const xOffset = 143; // X offset from the left side
      const yOffset = 13 + (index * 5); // Adjust positioning as needed
      doc.text(line, xOffset, yOffset);
    });

    const employeeInformation = {
      'Employee ID': employeeData.employeeId,
      'Employee Name': employeeData.employeeName,
      'Department': employeeData.department,
      'Designation': employeeData.designation,
      'Working Days': employeeData.workingDays,
      'Joining Date': employeeData.joiningDate,
      'Month': employeeData.month,
      'Year': employeeData.year,
      'Bank Name': employeeData.bankName,
      'Account Number': employeeData.accountNumber,
      'UAN Number': employeeData.UANNumber,
      'PanNumber': employeeData.PanNumber,
    };

    const otherEarningsFields = {
      'Basic Salary': employeeData.basicSalary,
      'House Rent Allowance': employeeData.houseRentAllowance,
      'Travelling Allowance': employeeData.travellingAllowance,
      'Medical Allowance': employeeData.medicalAllowance,
      'Dearness Allowance': employeeData.dearnessAllowance,
      'Gross Salary': employeeData.grossSalary,
      'Net Salary': employeeData.netSalary,
    };

    const otherDetails = {
      'PF': employeeData.pf,
      'Professional Tax': employeeData.professionalTax,
      // 'Others': employeeData.others,
    };
    const addFooter = () => {
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(0, 0, 255); // Set border color to blue (RGB: 0, 0, 255)
        doc.setFontSize(10);
        doc.text(
          '**This is system generated payslip no signature required**',
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          null,
          null,
          'center'
        );
      }
    };
    addFooter();
    const generateTable = (details, startX, startYPos, columnHeaders) => {
      const tableData = [];

      Object.entries(details).forEach(([key, value]) => {
        // Check if value is defined before calling toString
        const formattedValue = value !== undefined ? value.toString() : '';

        tableData.push([key, formattedValue]);
      });

      doc.autoTable({
        columns: columnHeaders,
        body: tableData,
        startY: startYPos,
        theme: 'grid',
        columnStyles: {
          0: { cellWidth: labelWidth },
        },
        startX: startX, // Set the X position for the table
        styles: {
          textColor: [0, 0, 128], // Navy blue color
        },
        headerStyles: {
          fillColor: [0, 0, 128], // Navy blue color for table header background
          textColor: [255, 255, 255], // White color for table header text
          fontStyle: 'bold', // Optionally, set the font style to bold for the header
        },
      });
      currentYPos = doc.autoTable.previous.finalY + 10;
    };

    const displayMonthYear = (month, year) => {
      const date = new Date(`${month} 1, ${year}`);
      const monthName = date.toLocaleString('default', { month: 'long' });
      const formattedYear = date.getFullYear();
      doc.setFontSize(12);
      doc.setFont('times', 'Bold');

      const text = `PAYSLIP: ${monthName} - ${formattedYear}`;
      const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const pageWidth = doc.internal.pageSize.getWidth();
      const xPos = (pageWidth - textWidth) / 2;

      doc.text(text, xPos, 40); // Adjust Y position if needed

      // Adding a horizontal line
      const lineY = 45; // Y position for the line
      const lineWidth = pageWidth - 5; // Adjust the value as needed
      doc.setLineWidth(0.6); // Set line width
      doc.setDrawColor(0); // Set color for the line, black in this case
      doc.line(5, lineY, lineWidth, lineY); // Draw the line
    };
    doc.setFillColor(0, 0, 255); // Blue color
    doc.setFontSize(16);
    displayMonthYear(employeeData.month, employeeData.year);

    const lineStartX = 5;
    const lineEndX = doc.internal.pageSize.width - 5;
    const lineY = 30;
    doc.line(lineStartX, lineY, lineEndX, lineY);
    const startVerticalPosition = 55;

    const employeeDetailsColumnHeaders = ['Employee Information', ''];
    generateTable(employeeInformation, 10, startVerticalPosition, employeeDetailsColumnHeaders);

    const earningsStartX = 10; // X position for Earnings table
    const earningsStartYPos = doc.autoTable.previous.finalY + 10;
    const earningsColumnHeaders = ['Earnings', ''];
    generateTable(otherEarningsFields, earningsStartX, earningsStartYPos, earningsColumnHeaders);

    const deductionsStartX = doc.internal.pageSize.width / 2 + 10; // X position for Deductions table
    const deductionsStartYPos = doc.autoTable.previous.finalY + 10;
    const deductionsColumnHeaders = ['Deductions', ''];
    generateTable(otherDetails, deductionsStartX, deductionsStartYPos, deductionsColumnHeaders);

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
    }
    const currentDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = monthNames[currentDate.getMonth()];
    const fileName = `${currentMonth}_${employeeData.employeeId}.pdf`;
    doc.save(`Payslip_${currentMonth}_${employeeData.employeeId}.pdf`);
    toast.success('Payslip downloaded successfully!');
  };
  return (
    <div>
      <ToastContainer position="top-right" />
      {/* <h2>Salary Data</h2> */}
      {/* <input
        
        type="text"
        placeholder="Filter by Employee ID"
        value={filterValue}
        onChange={handleFilterChange}
      /> */}
      <div className='bg'>

        <div class="input-container">
          <input
            type="text"
            class="input"
            placeholder="Filter by Employee ID"
            value={filterValue}
            onChange={handleFilterChange}
          />


          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 25 25" class="icon"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <rect fill="white" height="24" width="24"></rect> <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>


        </div>


        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Month</th>
              <th>Year</th>
              <th>JoiningDate</th>
              <th>Working Days</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>UAN Number</th>
              <th>Pan Number</th>
              <th>Basic Salary</th>
              <th>House Rent Allowance</th>
              <th>Travelling Allowance</th>
              <th>Medical Allowance</th>
              <th>Dearness Allowance</th>
              <th>PF</th>
              <th>Professional Tax</th>
              {/* <th>Others</th> */}
              {/* <th>Total Allowance</th> */}
              <th>Gross Salary</th>
              <th>Net Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {filteredData.map((salaryItem) => (
              <tr key={salaryItem._id}>
                <td>{salaryItem.employeeId}</td>
                <td>{salaryItem.employeeName}</td>
                <td>{salaryItem.department}</td>
                <td>{salaryItem.designation}</td>
                <td>{salaryItem.month}</td>
                <td>{salaryItem.year}</td>
                <td>{salaryItem.joiningDate}</td>
                <td>{salaryItem.workingDays}</td>
                <td>{salaryItem.accountNumber}</td>
                <td>{salaryItem.bankName}</td>
                <td>{salaryItem.UANNumber}</td>
                <td>{salaryItem.PanNumber}</td>
                <td>{salaryItem.basicSalary}</td>
                <td>{salaryItem.houseRentAllowance}</td>
                <td>{salaryItem.travellingAllowance}</td>
                <td>{salaryItem.medicalAllowance}</td>
                <td>{salaryItem.dearnessAllowance}</td>
                <td>{salaryItem.pf}</td>
                <td>{salaryItem.professionalTax}</td>
                {/* <td>{salaryItem.others}</td> */}
                {/* <td>{salaryItem.totalAllowance}</td> */}
                <td>{salaryItem.grossSalary}</td>
                <td>{salaryItem.netSalary}</td>
                {/* <td>
                <button onClick={() => openModal(salaryItem)}>Generate Payslip</button>
              </td> */}
                <td>
                  <button classname="pdf" onClick={() => downloadAsPDF(salaryItem)}>Download Payslip</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayPaySlipData;