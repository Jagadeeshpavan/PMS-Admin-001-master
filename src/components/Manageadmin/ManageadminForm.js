import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const ManageadminForm = ({ selectedAdmin, onSubmit, onCancel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    adminid: '',
    fullname: '',
    fathername: '',
    department: '',
    gender: '',
    dateofbirth: '',
    maritalstatus: '',
    phone1: '',
    phone2: '',
    email: '',
    password: '',
    address: '',
    permanentaddress: '',
    bloodgroup: '',
  });

  useEffect(() => {
    if (selectedAdmin) {
      setFormData(selectedAdmin);
    } else {
      setFormData({
        adminid: '',
        fullname: '',
        fathername: '',
        gender: '',
        dateofbirth: '',
        maritalstatus: '',
        phone1: '',
        phone2: '',
        email: '',
        password: '',
        address: '',
        permanentaddress: '',
        bloodgroup: '',
      });
    }
  }, [selectedAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content1">
        <h2>{selectedAdmin ? 'Edit Admin' : 'Add Admin'}</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="popup-input">
            <label>Admin ID:</label>
            <input
              type="text"
              name="adminid"
              value={formData.adminid}
              onChange={handleChange}
              disabled={selectedAdmin !== null} // Disable the input when editing
            />
          </div>
          <div className="popup-input">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Father Name:</label>
            <input
              type="text"
              name="fathername"
              value={formData.fathername}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Mother Name:</label>
            <input
              type="text"
              name="mothername"
              value={formData.mothername}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Designation:</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="popup-input">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Marital Status:</label>
            <select
              name="maritalstatus"
              value={formData.maritalstatus}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div className="popup-input">
            <label>PhoneNumber:</label>
            <input
              type="tel"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>AlternateNo:</label>
            <input
              type="tel"
              name="alternateno"
              value={formData.alternateno}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Blood Group:</label>
            <select
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
            >
              <option value="" disabled>SelectBloodGroup</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="popup-input">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
          <div className="popup-input">
            <label>confirmPassword</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() =>setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          <div className="popup-input">
            <label>CurrentAddress:</label>
            <textarea
              name="CurrentAddress"
              value={formData.CurrentAddress}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Permanent Address:</label>
            <textarea
              name="permanentaddress"
              value={formData.permanentaddress}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Joining Date:</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div> <div className="popup-input">
            <label>Work Location:</label>
            <select
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
            >
              <option value="">Select Work Location</option>
              <option value="BANGALORE">BANGALORE</option>
              <option value="CHENNAI">CHENNAI</option>
              <option value="HYDERABAD">HYDERABAD</option>


            </select>
          </div>
          <div className="popup-input">
            <label>Aadhar No:</label>
            <textarea
              name="Aadharno"
              value={formData.Aadharno}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>PAN No:</label>
            <textarea
              name="panno"
              value={formData.panno}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> Passport:</label>
            <textarea
              name="passport"
              value={formData.passport}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label> Driving License:</label>
            <textarea
              name="licensenumber"
              value={formData.licensenumber}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> Account Number </label>
            <textarea
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> A/C HolderName </label>
            <textarea
              name="AccountHolder"
              value={formData.AccountHolder}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> Bank Name </label>
            <textarea
              name="bankname"
              value={formData.bankname}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label> IFSC Code </label>
            <textarea
              name="ifsccode"
              value={formData.ifsccode}
              onChange={handleChange}
            />
          </div>


          <div className="popup-input">
            <label> Branch </label>
            <textarea
              name="Branch"
              value={formData.Branch}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>UAN</label>
            <textarea
              name="uan"
              value={formData.uan}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label> SSC</label>
            <textarea
              type="file"
              name="ssc"
              value={formData.ssc}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> Intermediate</label>
            <textarea
              type="file"
              name="inter"
              multiple
              value={formData.inter}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> B.Tech</label>
            <textarea
              type="file"
              name="Btech"
              multiple
              value={formData.Btech}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> UG</label>
            <textarea
              type="file"
              name="ug"
              multiple
              value={formData.ug}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label> PG</label>
            <textarea
              type="file"
              name="pg"
              multiple
              value={formData.pg}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Experience:</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
              <option value="0-1 years">0-1 years</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="popup-input">
            <label> Previous-CTC</label>
            <textarea
              name="Previouspackage"
              value={formData.Previouspackage}
              onChange={handleChange}
            />
          </div>
          
          <div className="popup-input">
            <label> Previous Payslip</label>
            <textarea
              name="previouspayslip"
              value={formData.previouspayslip}
              onChange={handleChange}
            />
          </div>
          
          
          <div className="popup-input">
            <label> Previous-Role</label>
            <textarea
              name="previousrole"
              value={formData.previousrole}
              onChange={handleChange}
            />
          </div>



          <div className="button-group">
            <button className="popup-button" type="submit">
              {selectedAdmin ? 'Update' : 'Add'}
            </button>
            <button className="popup-button" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageadminForm;