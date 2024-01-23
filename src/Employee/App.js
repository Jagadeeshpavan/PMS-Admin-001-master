import React, { useState } from 'react';
// import './App.css';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Sideba1 from '../Employee/Sideba1';
import Dashboard from '../Employee/Dashboard/Dashboard';
import GetCompanyDetails2 from '../Employee/GetCompanyDetails2/CompanyDetails2'
import Holiday from '../Employee/Holiday/Holiday'
import Leave from '../Employee/Leave/Leave'
import Payroll from '../Employee/Payroll/Payslip';




function App() {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <Router>
      {/* <Navbar/> */}
      <Sideba1/>
      <Routes>
        <Route path="/" element={<Sideba1/>} />
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/GetCompanyDetails2' element={<GetCompanyDetails2/>}/>
        <Route path="/Holiday" element={<Holiday/>} />
        <Route path="/Leave" element={<Leave/>} />
        <Route path="/Payslip" element={<Payslip/>} />








        
       
      </Routes>
    
  </Router>
  );
}

export default App;
