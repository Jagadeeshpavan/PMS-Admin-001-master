import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payroll.css';
import Sidebar from '../Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../Helper/Helper';


const CombinedForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        accountNumber: '',
        bankName: '',
        UANNumber: '',
        workingDays: '',
        department: '',
        designation: '',
        year: '',
        joiningDate: '',
        month: '',
        PanNumber: '',
        basicSalary: '',
        houseRentAllowance: '',
        travellingAllowance: '',
        medicalAllowance: '',
        dearnessAllowance: '',
        grossSalary: '',
        netSalary: '',
        totalAllowance: '',
        pf: '',
        professionalTax: '',
        others: ''
    });



 

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                // Remove quotes from employeeId before making the request
                const cleanedEmployeeId = formData.employeeId.replace(/["']/g, "");
                
                const response = await axios.get(`${BASE_URL}/employee_data/${cleanedEmployeeId}`);
                const employeeDetails = response.data;
    
                // Update the form data with the fetched employee details
                setFormData(prevData => ({
                    ...prevData,
                    employeeName: employeeDetails.fullname,
                    accountNumber: employeeDetails.accountno,
                    bankName: employeeDetails.bankname,
                    UANNumber: employeeDetails.uan,
                    PanNumber: employeeDetails.pan,
                    joiningDate: employeeDetails.joiningdate,
                    department: employeeDetails.department,
                    designation: employeeDetails.desigination,
                }));
            } catch (error) {
                // console.error('Error fetching employee details:', error);
                // Handle error
            }
        };
    
        // Fetch employee details only if the employeeId is not empty
        if (formData.employeeId !== '') {
            fetchEmployeeDetails();
        }
    }, [formData.employeeId]);
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateSalary = () => {
        const grossSalary =
            parseInt(formData.basicSalary) +
            parseInt(formData.houseRentAllowance) +
            parseInt(formData.medicalAllowance) +
            parseInt(formData.travellingAllowance) +
            parseInt(formData.dearnessAllowance);

        const netSalary =
            grossSalary -
            parseInt(formData.pf) -
            parseInt(formData.professionalTax) -
            parseInt(formData.others);

        return {
            grossSalary: grossSalary,
            netSalary: netSalary
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { totalAllowance, grossSalary, netSalary } = calculateSalary();

            const updatedFormData = {
                ...formData,
                totalAllowance: totalAllowance,
                grossSalary: grossSalary,
                netSalary: netSalary
            };
            await axios.post(`${BASE_URL}/Add_payslip`, updatedFormData);
            toast.success('Payslip Added successfully!');
            navigate('/DisplaySalaryData');
           
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return (
        <>
            <Sidebar />
            <div class="container1">
       <div className='border4352'>    
      <h2 className='h254'>CREATE PAYSLIP</h2>
      <div class="form">
            <form onSubmit={handleSubmit}>

        <div className='flex121'>
            <div className='flex7676'>
            <label className='label88654'>Employee ID</label>
            <input type="text" class="input-field" name="employeeId" value={formData.employeeId} onChange={handleInputChange} placeholder="enter ID" />
            </div>

            <div className='flex7676'>
            <label className='label88654'>Employee Name</label>
            <input type="text" class="input-field" name="employeeName" value={formData.employeeName} onChange={handleInputChange} placeholder="enter Name" />
            </div>

            <div className='flex7676'>
            <label className='label88654'>Department</label>
            <select class="input-field" name="department" value={formData.department} onChange={handleInputChange}>
                    <option value="">Select Department</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Data Science">Data Science</option>
            </select>
            </div>

        </div>

            <div className='flex121'>

            <div className='flex7676'>
            <label className='label88654'>Designation</label>
                <select class="input-field" name="designation" value={formData.designation} onChange={handleInputChange}>
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                   
                </select>
                </div>

                <div className='flex7676'>
                <label className='label88654 '>Joining Date</label>                        
                <input type="date" class="input-field" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} placeholder="Joining Date" />
                
                
                </div>

                <div className='flex7676'>
                <label className='label88654'>Pan Number</label>
                    <input type="text" class="input-field" name="PanNumber" value={formData.PanNumber} onChange={handleInputChange} placeholder="Pan Number" />
                
                
                </div>
                </div>


         <div className='flex121'>

                <div className='flex7676'>
                <label className='label88654'>Working Days</label>        
                <input type="number" class="input-field" name="workingDays"  value={formData.workingDays} onChange={handleInputChange} placeholder="Working Days" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>Account Number</label>
                <input type="text" class="input-field" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="enter Account Number" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>Bank Name</label>
                <input type="text" class="input-field" name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="enter Bank Name" />
        </div>
        </div>
                
        <div className='flex121'>  

        <div className='flex7676'>
                <label className='label88654'>UAN Number</label>        
                <input type="text"  class="input-field" name="UANNumber" value={formData.UANNumber} onChange={handleInputChange} placeholder="UAN Number" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>House Rent Allowance (HRA)</label>
                <input type="number" class="input-field" name="houseRentAllowance" value={formData.houseRentAllowance} onChange={handleInputChange} placeholder="House Rent Allowance" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>Medical Allowance</label>
                <input type="number"  class="input-field" name="medicalAllowance" value={formData.medicalAllowance} onChange={handleInputChange} placeholder="Medical Allowance" />
        </div> 
        </div>         


        <div className='flex121'> 

                <div className='flex7676'>
                <label className='label88654'>Dearness Allowance</label>          
                <input type="number" class="input-field"  name="dearnessAllowance" value={formData.dearnessAllowance} onChange={handleInputChange} placeholder="Dearness Allowance" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>Travelling Allowance</label> 
                <input type="number"  class="input-field" name="travellingAllowance" value={formData.travellingAllowance} onChange={handleInputChange} placeholder="Travelling Allowance" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>Basic Salary</label> 
                <input type="number"  class="input-field" name="basicSalary" value={formData.basicSalary} onChange={handleInputChange} placeholder="Basic Salary" />
        </div> 
        </div>


        <div className='flex121'> 

                <div className='flex7676'>
                <label className='label88654'>PF</label>          
                <input type="number" class="input-field" name="pf" value={formData.pf} onChange={handleInputChange} placeholder="PF" />
                </div>
                
                <div className='flex7676'>
                <label className='label88654'>Professional Tax</label> 
                <input type="number" class="input-field" name="professionalTax" value={formData.professionalTax} onChange={handleInputChange} placeholder="Professional Tax" />
                </div>

                <div className='flex7676'>
                <label className='label88654'>Month</label>
                <select class="input-field" name="month" id='month' value={formData.month} onChange={handleInputChange}>
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
                </div>  
        </div>

        <div className='flex1212'>
            <div className='flex7676 margin5643'>
            <label className='label88654'>Year</label>
                <select class="input-field" name="year" id='year' value={formData.year} onChange={handleInputChange}>
                    <option value="">Select Year</option>
                    {Array.from({ length: 9 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                </div>

                <div className='flex7676 margin564 '>
                <label className='label88654'>Others</label> 
                <input type="number" class="input-field" name="others" value={formData.others} onChange={handleInputChange} placeholder="Others" />
        
                    </div>
                </div>

                <div className='changebtn89'>
                <button type="submit" class="submit-btn">Submit</button>
                </div>
            </form>
        </div>
        </div>
        </div>
        </>
    );
};
export default CombinedForm;