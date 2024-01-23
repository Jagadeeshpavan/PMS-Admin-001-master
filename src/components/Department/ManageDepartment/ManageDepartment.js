import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageDepartment.css';
import Sidebar from '../../Sidebar';
import { BASE_URL } from '../../../Helper/Helper';

const ManageDepartment = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  const fetchDepartmentData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/api/department_data`);
      const fetchedData = response.data;
      setDepartmentList(fetchedData.map((department) => ({ ...department, isEditing: false })));
      setLoading(false);
    } catch (error) {
      // console.error('Error Fetching Department Data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEditClick = (index) => {
    const updatedList = [...departmentList];
    updatedList[index].isEditing = !updatedList[index].isEditing;
    setDepartmentList(updatedList);
  };

  

  const handleSaveClick = async (index) => {
    const updatedDepartment = departmentList[index];

    try {
      await axios.put(`${BASE_URL}/department_data/${updatedDepartment._id}`, {
        departmentname: updatedDepartment.departmentname,
        designation: updatedDepartment.designation.split(',').map((designation) => designation.trim()),
      });

      alert('Save operation succeeded');
      // Fetch updated data after successful save
      fetchDepartmentData();
    } catch (error) {
      console.error('Save operation failed:', error);
      alert('Save operation failed');
    }
  };

  const handleInputChange = (event, index, fieldName) => {
    const updatedList = [...departmentList];
    updatedList[index][fieldName] = event.target.value;
    setDepartmentList(updatedList);
  };

  const handleDeleteClick = async (index) => {
    const departmentToDelete = departmentList[index];

    if (window.confirm(`Are you sure you want to delete ${departmentToDelete.departmentname}?`)) {
      try {
        await axios.delete(`${BASE_URL}/department_data/${departmentToDelete._id}`);
        alert('Delete operation succeeded');
        // Remove the deleted department from the state
        setDepartmentList((prevList) => prevList.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Delete operation failed:', error);
        alert('Delete operation failed');
      }
    }
  };

  return (
    <div className="home2s">
      <Sidebar />
      <div className="class7856">
        <div className="outsideborder2s">
          <div className="daily2s">
            <h1 className="manage-employee2s">Manage departments</h1>
            {loading ? (
              <p className="loading90">Loading...</p>
            ) : error ? (
              <p className="loading90">Error: {error}</p>
            ) : (
              <div className="overflow254">
                
                <table className="department-table2s">
                  <thead>
                    <tr>
                      <th className="tableline34">Department Name</th>
                      <th className="tableline34">Designation</th>
                      <th className="tableline34">Action</th>
                      {/* <th className="tableline34">Delete</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {departmentList.map((department, index) => (
                      <tr key={department._id}>
                        <td className="tableline3489">
                          {department.isEditing ? (
                            <input
                            className='inputedit3489'
                              type="text"
                              value={department.departmentname}
                              onChange={(event) => handleInputChange(event, index, 'departmentname')}
                            />
                          ) : (
                            department.departmentname
                          )}
                        </td>
                        <td className="tableline3489">
                          {department.isEditing ? (
                            <input
                            className='inputedit3489'
                              type="text"
                              value={Array.isArray(department.designation) ? department.designation.join(', ') : department.designation}
                              onChange={(event) => handleInputChange(event, index, 'designation')}
                            />
                          ) : (
                            Array.isArray(department.designation) ? department.designation.join(', ') : department.designation
                          )}
                        </td>
                        <td className="tableline3489 textcenter34">
                          {department.isEditing ? (
                            <button className="save-button" onClick={() => handleSaveClick(index)}>
                              Save
                            </button>
                          ) : (
                            <button className="edit-button" onClick={() => handleEditClick(index)}>
                              Edit
                            </button>
                          )}
                          <button className="delete-button" onClick={() => handleDeleteClick(index)}>
                            Delete
                          </button>
                        </td>
                        {/* <td className="tableline3489">
                          <button className="delete-button" onClick={() => handleDeleteClick(index)}>
                            Delete
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDepartment;