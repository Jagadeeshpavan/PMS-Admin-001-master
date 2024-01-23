import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';
import Sidebar from '../../Sidebar';



const Attendance = () => {
  const [showTable, setShowTable] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All Employees');
  const [selectedDate, setSelectedDate] = useState('');
  const handleIntimeChange = (event, index) => {
    const updatedUsers = [...users];
    updatedUsers[index].intime = event.target.value;
    setUsers(updatedUsers);
  };

  const handleOuttimeChange = (event, index) => {
    const updatedUsers = [...users];
    updatedUsers[index].outtime = event.target.value;
    setUsers(updatedUsers);
  };

  const handleStatusChange = (event, index) => {
    const updatedUsers = [...users];
    updatedUsers[index].status = event.target.value;
    setUsers(updatedUsers);
  };
   console.log('selected dep ',selectedDepartment);
   console.log('selected date ',selectedDate);
  
   const handleUpdateClick = () => {
    const updatedData = users.map((user) => {
      return {
        ...user,
        // Assuming the backend API expects fields as `intime`, `outtime`, and `status`
        intime: user.intime,
        outtime: user.outtime,
        status: user.status,
      };
    });
console.log('updated ',updatedData)
    axios
      .put('http://localhost:5000/update_attendance_data', updatedData)
      .then((response) => {
       alert('Updated Successfully');
      })
      .catch((error) => {
        alert('Not Updated Successfully',error);
      });
  };


   const handleButtonClick = () => {
    let url = 'http://localhost:3003/attendance_data';
  
    if (selectedDepartment || selectedDate) {
      url += '?';
      if (selectedDepartment) {
        url += `departmentName=${selectedDepartment}`;
        if (selectedDate) {
          url += `&date=${selectedDate}`;
        }
      } else {
        url += `date=${selectedDate}`;
      }
    }
  
    fetch(url)
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
          setEmployeeList(data); // Assuming you want to update the employeeList state with the same data
          setShowTable(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  // const handleButtonClick = () => {
  //   fetch(`http://localhost:3003/attendance_data?departmentName=${selectedDepartment}`)
  //     .then(res => res.json())
  //     .then(
  //       (data) => {
  //         setIsLoaded(true);
  //         setUsers(data);
  //         setEmployeeList(data); // Assuming you want to update the employeeList state with the same data
  //         setShowTable(true);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle department change
  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setSelectedDepartment(value);
  };

 

  return (
    <div>
      <Sidebar/>
    <div className='home2s'>
   
      <div className='mastercontainer324'>
      <div className='outsideborder3s'>
        
          <h1 className='attendance3s'>Daily Attendance</h1>
          {/* <h1 className='line3s'></h1> */}
          <div className='header3s'>
            <div className='fields3s'>
              <h1 className='employee3s'>Employees By Department</h1>
              <select id="departmentSelect" className="selectbox3s" value={selectedDepartment} onChange={handleDepartmentChange}>
              <option value="All Employees3s">All Employees</option>
                <option value="marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="All Department">All Department</option>
                <option value="All Shifts">All Shifts</option>
                <option value="Attendance Details">Attendance Details</option>
                <option value="important Attendance">Important Attendance</option>
              </select>

            </div>

            <div className='fields3s'>



              <h1 className='employee3s'>Date</h1>
              <input type="date" className="attendace-date3s" value={selectedDate} onChange={handleDateChange} />
            </div>
            <div>
            <button className='button3s' onClick={handleButtonClick}>Get Employee List</button>
            </div>
             </div>
            
      </div>


      <div className='outsideborder23s'>



        {showTable && (users.length > 0) ? (
          <div className='table-container3s'>
            <div className='show3s'>
              Show
              <select className="showbox3s">
                <option value="">10</option>
                <option value="20">20</option>
              </select>
              entries
            </div>
            <table className='employee-table3s'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Attendance Type</th>
                  <th>Attendance By</th>
                  <th>Date</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* <tbody>
            {employeeList.map((employee, index) => (
              <tr key={index}>
                <td>{employee.sl}</td>
                <td>{employee.name}</td>
                <td>{employee.attendancetype}</td>
                <td>{employee.attendanceby}</td>
                <td>{employee.date}</td>
                <td>
      <input
        type="text"
        value={employee.Intime}
        onChange={(event) => {
          const updatedEmployeeList = [...employeeList];
          updatedEmployeeList[index].Intime = event.target.value;
          setEmployeeList(updatedEmployeeList);
        }}
      />
    </td>
                <td><input
        type="text"
        value={employee.outtime}
        onChange={(event) => {
          const updatedEmployeeList = [...employeeList];
          updatedEmployeeList[index].outtime = event.target.value;
          setEmployeeList(updatedEmployeeList);
        }}
      /></td>
                <td>
      <select
        value={employee.status}
        onChange={(event) => {
          const updatedEmployeeList = [...employeeList];
          updatedEmployeeList[index].status = event.target.value;
          setEmployeeList(updatedEmployeeList);
        }}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
        <option value="On Leave">On Leave</option>
        <button className='button' onClick={handleButtonClick}>Previous</button>
        <button className='button' onClick={handleButtonClick}>Next</button>
      </select>
    </td>
              </tr>
            ))}
          </tbody> */
          <tbody>
          {users.map((user, index) => (
            <tr key={user.slno}>
              <td>{user.slno}</td>
              <td>{user.employeename}</td>
              <td>{user.attendancetype}</td>
              <td>{user.attendanceby}</td>
              <td>{new Date(user.attendancedate).toLocaleDateString()}</td>
              <td>
                <input
                  type="tableText"
                  value={user.intime}
                  onChange={(event) => {
                    const updatedUsers = users.map((u, i) => {
                      if (i === index) {
                        return { ...u, intime: event.target.value };
                      }
                      return u;
                    });
                    setUsers(updatedUsers);
                  }}
                />
              </td>
              <td>
                <input
                  type="tableText"
                  value={user.outtime}
                  onChange={(event) => {
                    const updatedUsers = users.map((u, i) => {
                      if (i === index) {
                        return { ...u, outtime: event.target.value };
                      }
                      return u;
                    });
                    setUsers(updatedUsers);
                  }}
                />
              </td>
              <td>
      <select
        value={user.status}
        onChange={(event) => {
          const updatedEmployeeList = [...employeeList];
          updatedEmployeeList[index].status = event.target.value;
          setEmployeeList(updatedEmployeeList);
        }}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
        <option value="On Leave">On Leave</option>
      
      </select>
    </td>
            </tr>
          ))}
        </tbody>
              }
            </table>
            <button className='button3s' onClick={handleUpdateClick}>Update</button>
          </div>

        ) : (
          <p className='nodata3s'>No data available</p>
        )}
      </div>
      </div>
    </div>
    </div>

  );
};

export default Attendance;