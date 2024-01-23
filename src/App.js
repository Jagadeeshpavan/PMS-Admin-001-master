import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import SideBarEmp from "./Employee/SideBarEmp";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Department from "./components/Department/Add_Department/Department";
// import Settings from "./components/Settings/Settings";
import Dashboard from "./components/Dashboard/Dashboard";
import Add_employee from "./components/Add_employee/Employees";
import ManageEmployee from './components/ManageEmployee/ManageEmployee'
import ManageDepartment from './components/Department/ManageDepartment/ManageDepartment'
import Attendance from './components/Attendance/Daily-Attendance/Attendance'
import Reports from './components/Attendance/Attendance_Report/Reports'
import Payroll from "./components/Payroll/Payroll";
import AddHoliday from "./components/Holiday/AddHoliday";
import ManageHoliday from "./components/Holiday/ManageHoliday";
import LoginMern from "./components/LoginMern";
import RegistrationMern from "./components/RegistrationMern";
import ForgotPassword from "./components/ForgotPassword";
import Sideba1 from "./Employee/Sideba1";
// import Dashboard from "./Employee/Dashboard/Dashboard";
import CompanyDetails2 from './Employee/GetCompanyDetails2/CompanyDetails2';
import DigitalClock from "./Employee/Dashboard2/DigitalClock";
import Holiday2 from "./Employee/Holiday2/Holiday2";
import Payslip2 from "./Employee/Payroll2/Payslip2";
import Leave2 from "./Employee/Leave2/Leave2";
import Calender from "./Employee/Calender";
import Admin from "./components/Addadmin/Admin";
import Manageadmin from "./components/Manageadmin/Manageadmin";
import DisplaySalaryData from "./components/Payroll/DisplaySalaryData";
import EmployeeDetailsPage from "./components/FetchingUsingHelper";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<LoginMern />} />
        <Route path="/RegistrationMern" element={<RegistrationMern />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Add_employee" element={<Add_employee />} />
        <Route path="/ManageEmployee" element={<ManageEmployee />} />
        <Route path="/Department" element={<Department />} />
        <Route path="/ManageDepartment" element={<ManageDepartment />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Reports" element={<Reports />} />
        
        <Route path="/Payroll" element={<Payroll />} />
        <Route path="/AddHoliday" element={<AddHoliday />} />
        <Route path="/ManageHoliday" element={<ManageHoliday />} />
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="/Manageadmin" element={<Manageadmin/>}/>
         <Route path="/DisplaySalaryData" element={<DisplaySalaryData/>}/>


         

        {/* <Route path="/Employee" element={<Sideba1/>} /> */}
        {/* <Route path='/Dashboard2' element={<DigitalClock/>}/>
        <Route path="/CompanyDetails2" element={<CompanyDetails2 />} /> */}

        {/* <Route path="/Holiday2" element={<Holiday2/>} />
        <Route path="/Leave2" element={<Leave2/>} />
        <Route path="/Payslip2" element={<Payslip2/>} /> */}



        <Route path="/Employee" element={<SideBarEmp/>} />
        <Route path="/Dashboard2" element={<DigitalClock />} /> 
          <Route path="/Leave2" element={<Leave2 />} />
          <Route path="/Payslip2" element={<Payslip2 />} />
          <Route path="/Holiday2" element={<Holiday2 />} />
          <Route path="/CompanyDetails2" element={<CompanyDetails2 />} />



        <Route path="/EmployeeDetailsPage" element={<EmployeeDetailsPage/>} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;