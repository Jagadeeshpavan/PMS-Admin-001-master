import React, { useState, useEffect } from "react";
import "./Leave2.css"
import axios from "axios";
import Sideba1 from "../Sideba1";
// import SideBarEmp from "../SideBarEmp";


const Leave2 = () => {
  const [status, setStatus] = useState("");
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employee_data");
      // console.log("Response data:", response.data);

      const loggedInEmployeeDataInResponse = response.data.find(
        (employee) => employee.employeeid === loggedInEmployeeData.employeeid
      );

      if (loggedInEmployeeDataInResponse) {
        const departmentFromLoggedInEmployee =
          loggedInEmployeeDataInResponse.department;

        // console.log("Department:", departmentFromLoggedInEmployee);

        setDepartment(departmentFromLoggedInEmployee);
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } else {
        console.error("Logged-in employee not found in response data.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Fetching and parsing data from local storage
  const loggedInEmployeeData = JSON.parse(localStorage.getItem('loggedInEmployee'));

  // Extracting values from the parsed data
  const empIdFromLocalStorage = loggedInEmployeeData.employeeid;
  const empNameFromLocalStorage = loggedInEmployeeData.fullname;
  const empemailFromLocalStorage = loggedInEmployeeData.email;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { empId, empName,empMail, empDepartment, leaveType, fromDate, toDate, comment, file } = e.target.elements;
    let details = {
      empId: empIdFromLocalStorage,
      empName: empNameFromLocalStorage,
      empMail:empemailFromLocalStorage,
      empDepartment: empDepartment.value,
      leaveType: leaveType.value,
      fromDate: fromDate.value,
      toDate: toDate.value,
      comment: comment.value,
      file: file.value,
    };
    const response = await fetch("http://localhost:5000/Leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("");
    const result = await response.json();
    alert(result.status);
  };
  return (
    <div className="mother-cntainer">
      <Sideba1 />

      <div className="custom-container">

        <div className="custom-sec-page">
          <div className="custom-daily">
            <h1 className="custom-leavetypeh1">Apply Leave</h1>
          </div>
          <form
            action="/contact"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="empId">
                Emp ID
              </label>
              <input
                type="text"
                id="custom-empId"
                name="empId"
                className="custom-sasi"
                required
                value={empIdFromLocalStorage} // Set value directly from local storage
                readOnly // Make it read-only so that user cannot modify it
              />
            </div>
            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="empName">
                Emp Name
              </label>
              <input
                type="text"
                id="custom-empName"
                name="empName"
                className="custom-sasi"
                required
                value={empNameFromLocalStorage} // Set value directly from local storage
                readOnly // Make it read-only so that user cannot modify it
              />
            </div>


            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="empMail">
                Emp Mail
              </label>
              <input
                type="text"
                id="custom-empMail"
                name="empMail"
                className="custom-sasi"
                required
                value={empemailFromLocalStorage} // Set value directly from local storage
                readOnly // Make it read-only so that user cannot modify it
              />
            </div>

            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="empDepartment">
                Emp Department
              </label>
              <input
                type="text"
                id="custom-empDepartment"
                name="empDepartment"
                className="custom-sasi"
                value={department}
                readOnly
              />
            </div>


            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="leaveType">
                Leave Type
              </label>
              <select
                id="custom-leaveType"
                name="leaveType"
                className="custom-sasi"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Maternity/Paternity Leave">
                  Maternity/Paternity Leave
                </option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex342">
              <div className="custom-from">
                <label className="custom-employee-label" htmlFor="fromDate">
                  From
                </label>
                <input
                  className="custom-date"
                  type="date"
                  id="custom-fromDate"
                  name="fromDate"
                  required
                />
              </div>

              <div className="custom-from">
                <label className="custom-employee-label" htmlFor="toDate">
                  To
                </label>
                <input
                  className="custom-date"
                  type="date"
                  id="custom-toDate"
                  name="toDate"
                  required
                />
              </div>
            </div>
            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="comment">
                Purpose of leave
              </label>
              <textarea id="custom-comment" name="comment" required></textarea>
            </div>

            <div className="custom-leavetype">
              <label className="custom-employee-label" htmlFor="profilePhoto">
                Upload Document
              </label>
              <input className="custom-file" type="file" id="custom-file" name="file" />
            </div>

            <div className="center342">
              <button className="custom-leave-button" type="submit">
                {status}
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Leave2;