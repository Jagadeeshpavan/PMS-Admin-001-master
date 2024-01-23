import React, { useState, useEffect } from 'react';
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaTh, FaUser } from "react-icons/fa";
import './Dashboard.css'
import Sidebar from '../Sidebar';
import axios from 'axios';
import { BASE_URL } from '../../Helper/Helper';


const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [deptCount, setDeptCount] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [dailyQuote, setDailyQuote] = useState('');
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Simulating data fetching from the database
    const fetchEmployeeData = async () => {
      try {
        // Perform API request or database query to fetch employee data
        // Replace the following code with your actual data fetching logic
        const response = await fetch(`${BASE_URL}/employee_data`);
        const responseOne = await fetch(`${BASE_URL}/api/department_data`);
        // const data = await response.json();
        const employeeData = await response.json();
        const deptData = await responseOne.json();
        console.log(response);
        // Update the employee data state
        // setEmployeeData(data);
        setEmployeeData(employeeData);
        setDeptCount(deptData)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

     fetchEmployeeData();
  }, []);

  useEffect(() => {
    // Fetch attendance data
    const fetchAttendanceData = async () => {
      try {
        // Perform API request or database query to fetch attendance data
        const response = await fetch('http://localhost:3003/attendance_dashboard_data');
        const data = await response.json();

        // Update the attendance data state
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);
  const uniqueDepartments = new Set(employeeData.map((employee) => employee.department));
  const totalDepartments = uniqueDepartments.size;

  // const totalDepartments = employeeData.length;
  const totalEmployees = employeeData.length;
  const totalPresentToday = attendanceData.filter(
    (attendance) => attendance.status === 'Present'
  ).length;
  const totalOnLeaveToday = attendanceData.filter(
    (attendance) => attendance.status === 'Absent'
  ).length;


  useEffect(() => {
    fetchDailyQuote();

    const intervalId = setInterval(() => {
      fetchDailyQuote();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchDailyQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      console.log('Quote API response:', response.data); // Log the API response
      const { content, author } = response.data;
      const quote = `${content} - ${author}`;
      console.log('Fetched Quote:', quote); // Log the fetched quote
      setDailyQuote(quote);
    } catch (error) {
      console.error('Error fetching daily quote:', error);
      console.error('Error response:', error.response); // Log the error response
    }
  };



  return (

    <div className='Home1p'>
      <Sidebar />

      <div className='home1p'>
        <div className='outsideborder1p'>
          {/* <div className='daily1p'> */}
          <h1 className='manage-employee1p'>Dashboard</h1>
          {/* <h1 className='line1p'></h1> */}
          <div className='dashboard-header1p'>

            <div className='flexchain754'>
              <div className=" box645 box-bg-pink1p">
                {/* <div className='usha1ps'> */}
                <p className='usha1p'>Total Employees</p>

                <div className="icon-value1p">
                  <div className="icon1p">
                    <FaUsers size={30} />

                  </div>
                  <span className="value456"> {loading ? 'Loading...' : totalEmployees}</span>

                </div>
                {/* </div> */}
              </div>
              <div className="box645 box-bg-purple1p">
                {/* <div className='usha1ps'> */}
                <p className='usha1p'>Total Departments</p>
                <div className="icon-value1p">
                  <div className="icon1p">
                    <FaTh size={30} />
                  </div>

                  <span className="value456"> {deptCount.length}</span>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className='flexchain754'>
              <div className="box645 box-bg-cyan1p">
                {/* <div className='usha1ps'> */}
                <p className='usha1p'>Present Today</p>

                <div className="icon-value1p">
                  <div className="icon1p">
                    <FaUser size={30} />
                  </div>

                  <span className="value456">  {totalPresentToday}</span>
                </div>
                {/* </div> */}
              </div>

              <div className="box645 box-bg-ash1p">
                {/* <div className='usha1ps'> */}
                <p className='usha1p'>On Leave Today</p>

                <div className="icon-value1p">
                  <div className="icon1p">
                    <BsFillBookmarkFill size={30} />
                  </div>

                  <span className="value456">   {totalOnLeaveToday}</span>
                </div>
              </div>
            </div>
            {/* <div className='fields'>
              <h1 className='employee'>Total Departments</h1>
              {totalDepartments}
            </div>

            <div className='fields'>
              <h1 className='employee'>Total Employees</h1>
             {totalEmployees}
            </div>

            <div className='fields'>
              <h1 className='employee'>Total Present Today</h1>
              {totalPresentToday}
            </div>
            <div className='fields'>
              <h1 className='employee'>Total On Leave Today</h1>
              {totalOnLeaveToday}
            </div> */}

          </div>
          {/* </div> */}
        </div>

        <div className='outsideborder1p24'>
          <h1 className='manage-employee11p'>Quote of the Day</h1>
          <div className='header1p'>
            <div className='manage-employee11p23' style={{ textDecoration: 'none' }}>
              {dailyQuote || 'Loading quote...'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;