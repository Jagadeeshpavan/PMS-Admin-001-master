import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import ManageadminForm from "./ManageadminForm";
import "./Manageadmin.css";
import Sidebar from "../Sidebar";
import matrical from "../images/matrical-logo.png";
import { BASE_URL } from "../../Helper/Helper";

const Manageadmin = () => {
  const [admin, setAdmin] = useState([]);
  const [filteredAdmin, setFilteredAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAdminDetails, setSelectedAdminDetails] = useState(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin_data`);
      setAdmin(response.data);
      setFilteredAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (selectedAdmin) => {
    const adminDetails = admin.find(
      (admin) => admin.adminid === selectedAdmin.adminid
    );

    if (adminDetails) {
      setSelectedAdminDetails(adminDetails);
      setDetailsModalOpen(true);
    } else {
      console.error("Admin details not found:", selectedAdmin.adminid);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setAddPopupOpen(true);
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (selectedAdmin) {
        await axios.put(
          `${BASE_URL}/admin_data/${selectedAdmin.adminid}`,
          formData
        );
      } else {
        await axios.post(`${BASE_URL}/admin_data/add`, formData);
      }
      fetchAdmin();
      setSelectedAdmin(null);
      setAddPopupOpen(false);
    } catch (error) {
      console.error("Error adding/updating admin:", error);
      alert(
        "Error adding/updating employee. Please check the console for details."
      );
    }
  };

  const handleCancel = () => {
    setSelectedAdmin(null);
    setAddPopupOpen(false);
    setDetailsModalOpen(false);
    setDeleteConfirmation(false);
    setDeleteId(null);
  };

  const handleDelete = (id) => {
    setDeleteConfirmation(true);
    setDeleteId(id);
  };

  const handleConfirmDelete = (confirmed) => {
    setDeleteConfirmation(false);
    if (confirmed && deleteId) {
      handleDeleteAction(deleteId);
    }
    setDeleteId(null);
  };

  const handleDeleteAction = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin_data/${id}`);
      fetchAdmin();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = admin.filter((admin) => {
      const adminIdMatch =
        admin.adminid?.toLowerCase().includes(searchTermLowerCase) || false;
      const fullNameMatch =
        admin.fullname?.toLowerCase().includes(searchTermLowerCase) || false;

      return adminIdMatch || fullNameMatch;
    });

    setFilteredAdmin(filtered);
  };

  return (
    <div className="toprange436">
      <Sidebar />
      <div className="centerchange12">
        <div className="employee-table-container">
          <h2 className="employee-heading">Admin Management</h2>
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
                  <th>Admin ID</th>
                  <th>Full Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="flowchain56">
                {filteredAdmin.map((admin) => (
                  <tr key={admin.adminid}>
                    <td
                      className="clickable"
                      onClick={() => handleViewDetails(admin)}
                    >
                      {admin.adminid}
                    </td>
                    <td>{admin.fullname}</td>
                    <td>{admin.dateofbirth}</td>
                    <td>{admin.gender}</td>
                    <td>{admin.phonenumber}</td>
                    <td>{admin.CurrentAddress}</td>
                    <td>{admin.role}</td>
                    <td>{admin.email}</td>
                    <td>{admin.password}</td>
                    <td className="M1">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(admin)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(admin.adminid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Admin Details Modal */}
          {detailsModalOpen && selectedAdminDetails && (
            <div className="pms-emp-pop">
              <div className="pms-emp-pop-content">
                <div className="emp-header">
                  <h2 className="pms-emp-pop1">Admin Details</h2>
                </div>
                <h3 className="basicdetails">Basic Details</h3>
                <div className="basicedit-main">
                  <p className="basicedit">
                    {selectedAdminDetails.imagePath ? (
                      <img
                        className="employeeimage"
                        src={`${BASE_URL}/${selectedAdminDetails.imagePath}`}
                        alt=""
                        style={{ height: "140px", width: "140px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = matrical;
                        }}
                      />
                    ) : (
                      <span>No image available</span>
                    )}
                  </p>
                  &nbsp;&nbsp;&nbsp;
                  <img className="matrical-logo" src={matrical}></img>
                  <br />
                  <p className="basicedit">Admin ID: {selectedAdminDetails.adminid}</p>
                  <p className="basicedit">Full Name: {selectedAdminDetails.fullname}</p>
                  <p className="basicedit">Father Name: {selectedAdminDetails.fathername}</p>
                  <p className="basicedit">Mother Name: {selectedAdminDetails.mothername}</p>
                  <p className="basicedit">Department: {selectedAdminDetails.department}</p>
                  <p className="basicedit">Gender: {selectedAdminDetails.gender}</p>
                  <p className="basicedit">Date of Birth: {selectedAdminDetails.dateofbirth}</p>
                  <p className="basicedit">PhoneNumber: {selectedAdminDetails.phonenumber}</p>
                  <p className="basicedit">Alternate Number: {selectedAdminDetails.alternateno}</p>
                  <p className="basicedit">Email: {selectedAdminDetails.email}</p>
                  <p className="basicedit">Password: {selectedAdminDetails.password}</p>
                  <p className="basicedit">confirmPassword: {selectedAdminDetails.confirmPassword}</p>
                  <p className="basicedit">CurrentAddress: {selectedAdminDetails.CurrentAddress}</p>
                  <p className="basicedit">Permanent Address: {selectedAdminDetails.permanentaddress}</p>
                  <p className="basicedit">Joining Date: {selectedAdminDetails.joiningDate}</p>
                  <p className="basicedit">Role: {selectedAdminDetails.role}</p>
                </div>

                <div className="extradetails">
                  <p>Designation: {selectedAdminDetails.designation}</p>
                  <p>Work Location: {selectedAdminDetails.workLocation}</p>
                  <p>Martial Status: {selectedAdminDetails.maritalstatus}</p>
                  <p>Blood Group: {selectedAdminDetails.bloodgroup}</p>
                </div>

                <h3 className="identityclass">Identity Details:</h3>
                <div className="identityedit-main">
                  <p className="identityedit">Aadhar No: {selectedAdminDetails.Aadharno}</p>
                  <p className="identityedit">PAN No: {selectedAdminDetails.panno}</p>
                  <p className="identityedit">Passport: {selectedAdminDetails.passport}</p>
                  <p className="identityedit">Driving License: {selectedAdminDetails.drivinglicense}</p>
                </div>

                <h3 className="bankdetails">Bank Details</h3>
                <div className="bankdetails-main">
                  <p className="bankedit">Account Number: {selectedAdminDetails.accountNumber}</p>
                  <p className="bankedit">A/C HolderName: {selectedAdminDetails.AccountHolder}</p>
                  <p className="bankedit">IFSC Code: {selectedAdminDetails.ifsccode}</p>
                  <p className="bankedit">Bank Name: {selectedAdminDetails.bankname}</p>
                  <p className="bankedit">Branch: {selectedAdminDetails.Branch}</p>
                  <p className="bankedit">UAN: {selectedAdminDetails.uan}</p>
                </div>

                <div className="closebutton">
                  <button onClick={handleCancel}>Close</button>
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
              <p className="ppp23">Are you sure you want to delete this admin?</p>
              <div className="delete-buttons">
                <button onClick={() => handleConfirmDelete(true)}>Yes</button>
                <button onClick={() => handleConfirmDelete(false)}>No</button>
              </div>
            </div>
          </Popup>

          <Popup
            open={selectedAdmin !== null || isAddPopupOpen}
            onClose={handleCancel}
            closeOnDocumentClick
          >
            <ManageadminForm
              selectedAdmin={selectedAdmin}
              onSubmit={handleAddOrUpdate}
              onCancel={handleCancel}
            />
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default Manageadmin;