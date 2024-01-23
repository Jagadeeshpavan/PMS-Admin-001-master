import React, { useState } from 'react';
import './Reports.css';
import Sidebar from '../../Sidebar';

export const Reports = () => {

  const [showTable, setShowTable] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All Employees');
  const [selectedDate, setSelectedDate] = useState('');
  
  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleButtonClick = () => {
    let url = 'http://localhost:3003/attendance_data';
  
    if (selectedDepartment) {
      url += `?departmentName=${selectedDepartment}`;
    }
  
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          let filteredData = data;
  
          if (selectedYear) {
            filteredData = filteredData.filter(user => {
              const attendanceYear = new Date(user.attendancedate).getFullYear();
              return attendanceYear.toString() === selectedYear;
            });
          }
  
          if (selectedMonth) {
            filteredData = filteredData.filter(user => {
              const attendanceMonth = new Date(user.attendancedate).getMonth() + 1; // Month is zero-based
              return attendanceMonth.toString() === selectedMonth;
            });
          }
  
          setIsLoaded(true);
          setUsers(filteredData);
          setEmployeeList(filteredData); // Assuming you want to update the employeeList state with the same data
          setShowTable(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  
  // const handleButtonClicks = () => {
  //   // Simulated data retrieval
  //   const data = [
  //     { sl:1,name: 'Deepak',summary:'4/20',one:'Present',two:'Saturday',three:'Sunday',four:'Present',five:'-',six:'Present',seven:'Present',eight:'-',nine:'Saturday',ten:'Sunday',eleven:'-',twelve:'-',thirteen:'-',fourteen:'-' },     
  //     { sl:2,name: 'John',summary:'3/20',one:'Absent',two:'Saturday',three:'Sunday',four:'Present',five:'-',six:'Present',seven:'Present',eight:'-',nine:'Saturday',ten:'Sunday',eleven:'-',twelve:'-',thirteen:'-',fourteen:'-',fifteen:'-' },     
  //     { sl:3,name: 'Karan Sharma',summary:'4/20',one:'Present',two:'Saturday',three:'Sunday',four:'Present',five:'-',six:'Present',seven:'Present',eight:'-',nine:'Saturday',ten:'Sunday',eleven:'-',twelve:'-',thirteen:'-',fourteen:'-',fifteen:'-' },     
  //     { sl:4,name: 'Test Employee',summary:'1/20',one:'-',two:'Saturday',three:'Sunday',four:'',five:'-',six:'Present',seven:'Present',eight:'-',nine:'Saturday',ten:'Sunday',eleven:'-',twelve:'-',thirteen:'-',fourteen:'-',fifteen:'-' },      
     
  //   ];
  //   setEmployeeList(data);
  //   setShowTable(true);
  // };
  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setSelectedDepartment(value);
  };

  const currentYear = new Date().getFullYear();
  // Generate an array of years from 1900 until the current year
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => 1900 + index);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className='home4s'>
      <Sidebar/>
     <div className='mastercontainer123'>
      <div className='outsideborder4s'>
      
      <h1 className='attendance4s'>Attendance Report</h1> 
      {/* <h1 className='line4s'></h1>  */}
      <div className='header4s'>
      <div className='reportfields4s'>
              <h1 className='employee4s'>Employees By Department</h1>
              <select id="departmentSelect" className="selectbox4s" value={selectedDepartment} onChange={handleDepartmentChange}>
                <option value="All Employees">All Employees</option>
                <option value="marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="finance">Finance</option>
                <option value="All Department">All Department</option>
                <option value="All Shifts">All Shifts</option>
                <option value="Attendance Details">Attendance Details</option>
                <option value="important Attendance">Important Attendance</option>
              </select>

            </div>


            <div className='reportfields4s'>
              <h1 className='employee4s'>Year</h1>
              <select className="selectbox4s" value={selectedYear} onChange={handleYearChange}>
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className='reportfields4s'>
              <h1 className='employee4s'>Month</h1>
              <select className="selectbox4s" value={selectedMonth} onChange={handleMonthChange}>
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <button className='report-button4s' onClick={handleButtonClick} >Show Report</button>
        </div>
     
      </div>
     

      <div className='outsideborder24s'>
        
         
       
     {showTable && (
         <div className='report-table-container4s'>
         <table className='report-employee-table4s'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Date</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr key={user.slno}>
              <td>{user.slno}</td>
              <td>{user.employeename}</td>
              <td>{new Date(user.attendancedate).toLocaleDateString()}</td>
              <td>{user.status}</td>
            
            </tr>
          ))}
          </tbody>
        </table>
       
        </div>
       
      )}
      </div>
      </div>
    </div>
  );
};

export default Reports;