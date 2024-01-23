import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import ManageEmployeeForm from "./ManageEmployeeForm";
import "./ManageEmployee.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar";
import matrical from "../images/matrical-logo.png"
import { BASE_URL } from "../../Helper/Helper";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [isEmployeeActive, setIsEmployeeActive] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  // const fetchEmployees = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/employee_data`);
  //     setEmployees(response.data);
  //     setFilteredEmployees(response.data);
  //   } catch (error) {
  //     console.error("Error fetching employees:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employee_data`);
      console.log("Response data:", response.data); // Check the response data
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };


  const handleViewDetails = (employee) => {
    const employeeDetails = employees.find(
      (e) => e.employeeid === employee.employeeid
    );

    if (employeeDetails) {
      setSelectedEmployeeDetails(employeeDetails);
      setDetailsModalOpen(true);
    } else {
      console.error("Employee details not found:", employee.employeeid);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setAddPopupOpen(true);
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (selectedEmployee) {
        await axios.put(
          `${BASE_URL}/employee_data/${selectedEmployee.employeeid}`,
          formData
        );
        toast.success("Employee updated successfully!");

      } else {
        await axios.post(`${BASE_URL}/employee_data/add`, formData);
        toast.success("Employee added successfully!");

      }
      fetchEmployees();
      setSelectedEmployee(null);
      setAddPopupOpen(false);
    } catch (error) {
      console.error("Error adding/updating employee:", error);
      toast.error("Error adding/updating employee. Please check the console for details.");

       }
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setAddPopupOpen(false);
    setDetailsModalOpen(false);
    setDeleteConfirmation(false);
    setDeleteId(null);
  };
  // const handleDelete = (id) => {
  //   setDeleteConfirmation(true);
  //   setDeleteId(id);
  // };

  const handleConfirmDelete = async (confirmed) => {
    setDeleteConfirmation(false);
    if (confirmed && deleteId) {
      await handleDeleteAction(deleteId);
    }
    setDeleteId(null);
  };
  const handleDeleteAction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/employee_data/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

 
  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = employees.filter((employee) => {
      const employeeIdMatch =
        employee.employeeid?.toLowerCase().includes(searchTermLowerCase) || false;
      const fullNameMatch =
        employee.fullname?.toLowerCase().includes(searchTermLowerCase) || false;

      return employeeIdMatch || fullNameMatch;
    });

    setFilteredEmployees(filtered);
  };
  const handleActivateDeactivate = async (employeeId, isActive) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/employee_data/${employeeId}/activate_deactivate`,
        { isActive }
      );

      if (response.status === 200) {
        // Update the UI to reflect the change in status
        setIsEmployeeActive(isActive);
        fetchEmployees(); // Fetch the updated employee list
        window.alert(
          `Employee ${isActive ? "activated" : "deactivated"} successfully!`
        );
      } else {
        console.error("Failed to update employee status");
      }
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };
  const handleActivate = async (employeeId) => {
    try {
      const confirmActivate = window.confirm(
        "Are you sure you want to activate this employee?"
      );

      if (confirmActivate) {
        await axios.put(
         `${BASE_URL}/employee_data/${employeeId}/activate_deactivate`,
          { isActive: true }
        );
        fetchEmployees();
        toast.success("Employee activated successfully!");
      } else {
        // User clicked Cancel
        console.log("Activation cancelled by user");
      }
    } catch (error) {
      console.error("Error activating employee:", error);
      toast.error("Error activating employee. Please check the console for details.");
    }
  };

  const handleDeactivate = async (employeeId) => {
    try {
      const confirmDeactivate = window.confirm(
        "Are you sure you want to deactivate this employee?"
      );

      if (confirmDeactivate) {
        await axios.put(
          `${BASE_URL}/employee_data/${employeeId}/activate_deactivate`,
          { isActive: false }
        );
        fetchEmployees();
        toast.success("Employee deactivated successfully!");
      } else {
        // User clicked Cancel
        console.log("Deactivation cancelled by user");
      }
    } catch (error) {
      console.error("Error deactivating employee:", error);
      toast.error("Error deactivating employee. Please check the console for details.");
    }
  };

 


  return (
    <div className="toprange436">
      <Sidebar />
      <div className="centerchange12">
        <div className="employee-table-container">
          <h2 className="employee-heading">Employee Management</h2>
          <input
            className="search1"
            type="text"
            placeholder="Search by ID "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button1" onClick={handleSearch}>
            Search
          </button>
          <div className="overchange34">
            <table className="employee-table">
              <thead className="thread45">
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Local Address</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Actions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="flowchain56">
                {filteredEmployees.map((employee) => (
                  <tr className="trborder43" key={employee.employeeid}>
                    <td
                      className="clickable tdborder32"
                      onClick={() => handleViewDetails(employee)}
                    >
                      {employee.employeeid}
                    </td>
                    <td className="tdborder32">{employee.fullname}</td>
                    <td className="tdborder32">{employee.department}</td>
                    <td className="tdborder32">{employee.dateofbirth}</td>
                    <td className="tdborder32">{employee.gender}</td>
                    <td className="tdborder32">{employee.contactno}</td>
                    <td className="tdborder32"> {employee.localaddress} </td>
                    <td className="tdborder32">{employee.role}</td>
                    <td className="tdborder32">{employee.email}</td>

                    <td className="M1">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(employee)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(employee.employeeid)} 
                      >
                        Delete
                      </button>  </td>
                    <td>
                      
                      <button
                    className={`activate-deactivate-button ${
                      employee.isActive ? "active" : "inactive"
                    }`}
                    onClick={() =>
                      employee.isActive
                        ? handleDeactivate(employee.employeeid)
                        : handleActivate(employee.employeeid)
                    }
                  >
                    {employee.isActive ? "Deactivate" : "Activate"}
                  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Employee Details Modal */}
          {detailsModalOpen && selectedEmployeeDetails && (
            <div className="pms-emp-pop">
              <div className="pms-emp-pop-content">
               <div className="emp-header">  <h2 className="pms-emp-pop1">Employee Details</h2> </div>
                <h3 className="basicdetails">Basic Details</h3>
                <div className="basicedit-main">
               
                  <p className="basicedit">
                    
                    {selectedEmployeeDetails.imagePath ? (
                      <img
                        className="employeeimage"
                        src={`${BASE_URL}/${selectedEmployeeDetails.imagePath}`}

                        alt=""
                        style={{ height: "140px", width: "140px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = matrical; // Fallback image URL or a placeholder
                        }}
                      />
                    ) : (
                      <span>No image available</span>
                    )}
                  </p>

                  &nbsp;&nbsp;&nbsp;
                    <img className="matrical-logo"
                      src={matrical}
                      // style={{ height: "130px", width: "130px " }}
                    ></img>
                    <br />
                    <p className="basicedit">
                    Employee ID: {selectedEmployeeDetails.employeeid}
                  </p>
                    <p className="basicedit">
                    Full Name: {selectedEmployeeDetails.fullname}
                  </p>
                  <p className="basicedit">
                    Father's Name: {selectedEmployeeDetails.fathername}
                  </p>
                  <p className="basicedit">
                    Mother Name : {selectedEmployeeDetails.mothername}
                  </p>
                  <p className="basicedit">
                    Department : {selectedEmployeeDetails.department}
                  </p>
                  <p className="basicedit">
                    Gender: {selectedEmployeeDetails.gender}
                  </p>
                  <p className="basicedit">
                    Date of Birth: {selectedEmployeeDetails.dateofbirth}
                  </p>
                  <p className="basicedit">
                    Contact : {selectedEmployeeDetails.contactno}
                  </p>
                  <p className="basicedit">
                    Alternate Number: {selectedEmployeeDetails.alternateno}
                  </p>
                  <p className="basicedit">
                    Email: {selectedEmployeeDetails.email}
                  </p>
                  <p className="basicedit">
                    Password: {selectedEmployeeDetails.password}
                  </p>
                  <p className="basicedit">
                    Confirm Password: {selectedEmployeeDetails.confirmpassword}
                  </p>
                  <p className="basicedit">
                    Local Address: {selectedEmployeeDetails.localaddress}
                  </p>
                  <p className="basicedit">
                    Permenant Address:{" "}
                    {selectedEmployeeDetails.permenantaddress}
                  </p>
                  <p className="basicedit">
                    Joining Date: {selectedEmployeeDetails.joiningdate}
                  </p>
                  <p className="basicedit">
                    Role: {selectedEmployeeDetails.role}
                  </p>
                </div>

                <div className="extradetails">
                  <p>Desigination : {selectedEmployeeDetails.desigination}</p>
                  <p>Work Location: {selectedEmployeeDetails.worklocation}</p>
                  <p>Martial Status: {selectedEmployeeDetails.martialstatus}</p>
                  <p>Blood Group : {selectedEmployeeDetails.bloodgroup}</p>
                </div>

                <h3 className="identityclass">Identity Details :</h3>
                <div className="identityedit-main">
                  <p className="identityedit">
                    Aadhar Number: {selectedEmployeeDetails.aadhar}
                  </p>
                  <p className="identityedit">
                    PAN Number: {selectedEmployeeDetails.pan}
                  </p>
                  <p className="identityedit">
                    Passport: {selectedEmployeeDetails.passport}
                  </p>
                  <p className="identityedit">
                    Driving License: {selectedEmployeeDetails.drivinglicense}
                  </p>
                </div>

                <h3 className="bankdetails">Bank Details</h3>
                <div className="bankdetails-main">
                  <p className="bankedit">
                    Account Number: {selectedEmployeeDetails.accountno}
                  </p>
                  <p className="bankedit">
                    Account Name: {selectedEmployeeDetails.accountname}
                  </p>
                  <p className="bankedit">
                    IFSC Code: {selectedEmployeeDetails.ifsccode}
                  </p>
                  <p className="bankedit">
                    Bank Name: {selectedEmployeeDetails.bankname}
                  </p>
                  <p className="bankedit">
                    Branch: {selectedEmployeeDetails.branch}
                  </p>
                  <p className="bankedit">UAN: {selectedEmployeeDetails.uan}</p>
                </div>

                <h3 className="documentation">Documentation :</h3>
                <div className="documentedit-main">
                  <p className="documentedit">
                    SSC: {selectedEmployeeDetails.tenth}
                  </p>
                  <p className="documentedit">
                    Inter: {selectedEmployeeDetails.inter}
                  </p>
                  <p className="documentedit">
                    Btech: {selectedEmployeeDetails.btech}
                  </p>
                  <p className="documentedit">
                    Experience: {selectedEmployeeDetails.experience}
                  </p>
                  <p className="documentedit">
                    Previous-PaySlip: {selectedEmployeeDetails.previouspayslip}
                  </p>
                  <p className="documentedit">
                    Previous-Role: {selectedEmployeeDetails.previousrole}
                  </p>
                </div>
                     

                <div className="closebutton">
                  <button className="btnclose213" onClick={handleCancel}>Close</button> 
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          <Popup
            open={deleteConfirmation}
            onClose={() => handleConfirmDelete(false)}
          >
            <div className="delete-confirmation-popup">
              <p className="ppp23">Are you sure you want to delete this employee?</p>
              <div className="delete-buttons">
                <button onClick={() => handleConfirmDelete(true)}>Yes</button>
                <button onClick={() => handleConfirmDelete(false)}>No</button>
              </div>
            </div>
          </Popup>

          <Popup className="pop"
            open={selectedEmployee !== null || isAddPopupOpen}
            onClose={handleCancel}
            closeOnDocumentClick
          >
            <ManageEmployeeForm
              selectedEmployee={selectedEmployee}
              onSubmit={handleAddOrUpdate}
              onCancel={handleCancel}
            />
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployee;