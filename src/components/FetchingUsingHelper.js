// import React, { useEffect, useState } from 'react';
// import { fetchEmployeeById } from '../Helper/Helper';

// const EmployeeDetailsPage = () => {
//     const [employeeDetails, setEmployeeDetails] = useState({
//         fullname: '',
//         email: '',
//         employeeid: '',
//         department: '',
//         // Add other properties with default values
//     });
//     const [loggedInEmployee, setLoggedInEmployee] = useState(null);

//     useEffect(() => {
//         // Load employee details from localStorage when the component mounts
//         const storedEmployee = localStorage.getItem('loggedInEmployee');
//         if (storedEmployee) {
//             setLoggedInEmployee(JSON.parse(storedEmployee));
//         }
//     }, []);

//     useEffect(() => {
//         // Check if loggedInEmployee is available
//         if (loggedInEmployee) {
//             const fetchData = async () => {
//                 try {
//                     const details = await fetchEmployeeById(loggedInEmployee.employeeid);
//                     console.log(details.email);
//                     setEmployeeDetails(details);
//                 } catch (error) {
//                     console.error('Error:', error);
//                 }
//             };

//             fetchData();
//         }
//     }, [loggedInEmployee]);

//     if (!loggedInEmployee || !employeeDetails.email) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Employee Details</h2>
//             <p>Name: {employeeDetails.fullname}</p>
//             <p>Email: {employeeDetails.email}</p>
//             <p>Employee ID: {employeeDetails.employeeid}</p>
//             <p>Department: {employeeDetails.department}</p>
//             {/* Add other details as needed */}
//         </div>
//     );
// };

// export default EmployeeDetailsPage;
