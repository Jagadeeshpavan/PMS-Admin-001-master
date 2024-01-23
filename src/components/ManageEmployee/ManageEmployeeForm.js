import React, { useState, useEffect } from 'react';
// import '../styles/EmployeeForm.css';

const MangeEmployeeForm = ({ selectedEmployee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeid: '',
    fullname: '',
    fathername: '',
    mothername:'',
    department:'',
    desigination:'',
    gender: '',
    bloodgroup:'',
    martialstatus:'',
    dateofbirth: '',
    contactno:'',
    alternateno:'',
    email: '',
    password:'',
    confirmpassword:'',
    localaddress:'',
    permenantaddress:'',
    joiningdate:'',
    worklocation:'',

    aadharno:'',
    panno :'',
    passport:'',
    drivinglicense :'',

    accountno:'',
    accountname:'',
    ifsccode:'',
    bankname:'',
    branch:'',
    uan:'',


    tenth:'',
    inter:'',
    btech:'',
    experience:'',
    previouspayslip:'',
    previousrole:'',

  
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    } else {
      setFormData({
        employeeid: '',
        fullname: '',
        fathername: '',
        mothername:'',
        department:'',
        desigination:'',
        bloodgroup:'',
        gender: '',
        martialstatus:'',
        dateofbirth: '',
        contactno:'',
        alternateno:'',
        email: '',
        password:'',
        confirmpassword:'',
        localaddress:'',
        permenantaddress:'',
        joiningdate:'',
        worklocation:'',
       
        aadharno:'',
        panno :'',
        passport:'',
        drivinglicense :'',
        
        accountno:'',
        accountname:'',
        ifsccode:'',
        bankname:'',
        branch:'',
        uan:'',
    
    
        tenth:'',
        inter:'',
        btech:'',
        experience:'',
        previouspayslip:'',
        previousrole:'',
      });
    }
  }, [selectedEmployee]);

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
        <h2>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="popup-input">
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeid"
              value={formData.employeeid}
              onChange={handleChange}
              disabled={selectedEmployee !== null} // Disable the input when editing
            />
          </div>
          <div className="popup-input">
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
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
            <label>Desigination:</label>
            <input
              type="text"
              name="desigination"
              value={formData.desigination}
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
            <label>Blood Group:</label>
            <select
              name="bloodgroup"
              value={formData.bloodgroup}
              onChange={handleChange}
            >
               <option value="">Select</option>
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
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Martial Status:</label>
            <select
              name="martialstatus"
              value={formData.martialstatus}
              onChange={handleChange}
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div className="popup-input">
            <label>Contact :</label>
            <input
              type="tel"
              name="contactno"
              value={formData.contactno}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Alternate Number:</label>
            <input
              type="tel"
              name="alternateno"
              value={formData.alternateno}
              onChange={handleChange}
            />
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
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Confirm Password:</label>
            <input
              type="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Local Address:</label>
            <textarea
              name="localaddress"
              value={formData.localaddress}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Permanent Address:</label>
            <textarea
              name="permenantaddress"
              value={formData.permenantaddress}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Joining Date:</label>
            <textarea
              name="joiningdate"
              value={formData.joiningdate}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Work Location:</label>
            <textarea
              name="worklocation"
              value={formData.worklocation}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Aadhar Number:</label>
            <textarea
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>PAN Number:</label>
            <textarea
              name="pan"
              value={formData.pan}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Passport:</label>
            <textarea
              name="passport"
              value={formData.passport}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Driving License:</label>
            <textarea
              name="drivinglicense"
              value={formData.drivinglicense}
              onChange={handleChange}
            />
          </div>

              
          <div className="popup-input">
            <label>Account Number:</label>
            <textarea
              name="accountno"
              value={formData.accountno}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Account Name:</label>
            <textarea
              name="accountname"
              value={formData.accountname}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>IFSC Code:</label>
            <textarea
              name="ifsccode"
              value={formData.ifsccode}
              onChange={handleChange}
            />
          </div>

              
          <div className="popup-input">
            <label>Bank Name:</label>
            <textarea
              name="bankname"
              value={formData.bankname}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Branch:</label>
            <textarea
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>UAN:</label>
            <textarea
              name="uan"
              value={formData.uan}
              onChange={handleChange}
            />
          </div>




          <div className="popup-input">
            <label>SSC:</label>
            <textarea
              name="tenth"
              value={formData.tenth}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Inter:</label>
            <textarea
              name="inter"
              value={formData.inter}
              onChange={handleChange}
            />
          </div>

              
          <div className="popup-input">
            <label>Btech:</label>
            <textarea
              name="btech"
              value={formData.btech}
              onChange={handleChange}
            />
          </div>

          <div className="popup-input">
            <label>Experience:</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Previous-PaySlip:</label>
            <textarea
              name="previouspayslip"
              value={formData.previouspayslip}
              onChange={handleChange}
            />
          </div>
          <div className="popup-input">
            <label>Previous-Role:</label>
            <textarea
              name="previousrole"
              value={formData.previousrole}
              onChange={handleChange}
            />
          </div>


          <div className="button-group">
            <button className="popup-button" type="submit">
              {selectedEmployee ? 'Update' : 'Add'}
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

export default MangeEmployeeForm;