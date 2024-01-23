import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Sidebarda1 } from "./Sidebarda1";
import Submen1 from "./Submen1";
import { IconContext } from "react-icons/lib";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';




const Nav = styled.div`
background: rgb(0, 7, 61);
  position: fixed;
  margin-right:5px;
  width: 100%;
  color: #fff;
  height: 80px;
  display: flex;
  margin-bottom: 540px;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s, color 0.3s;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 z-index:99;
 top:0;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
`;

const ProfileIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;

  .profile-initial {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #333; /* Set a background color */
    color: #fff;
    border-radius: 50%; /* Make it a circle */
    text-align: center;
    line-height: 30px;
    font-weight: bold;
    margin-right: 10px;
  }
`;

const ProfileBox = styled.div`
  position: absolute;
  top: 49px;
  right: 5px;
  background: darkblue;
  width:max-content;
  block-size:max-content;
  color:white;
  padding: 10px;
  border-radius: 5px;
  display: ${({ showProfileBox }) => (showProfileBox ? "block" : "none")}

`;

const SidebarNav = styled.nav`
  background: rgb(0, 7, 61) ;
  color: #fff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  margin-left:0px;
  position: fixed;
  
  left: ${({ sidebar }) => (sidebar ? "0" : "-247px")};
  transition: left 350ms;
  z-index: 99;
`;

const SidebarWrap = styled.div`
  width: 100%;
  overflow-y: auto;
  background: #15171c;
  color: #fff;
`;

const Sideba1 = () => {
  const [sidebar, setSidebar] = useState(true);
  const [showProfileBox, setShowProfileBox] = useState(false);

  const [loggedInEmployee, setLoggedInEmployee] = useState(null);

  const navigate = useNavigate(); // Accessing the useNavigate hook


  useEffect(() => {
    // Load employee details from localStorage when component mounts
    const storedEmployee = localStorage.getItem('loggedInEmployee');
    if (storedEmployee) {
      setLoggedInEmployee(JSON.parse(storedEmployee));
    }
  }, []);

 

  const handleLogout = () => {
    // Clear the stored employee details from state and localStorage on logout
    setLoggedInEmployee(null);
    localStorage.removeItem('loggedInEmployee');
    // Perform logout logic if needed
    console.log("Logout ");
    // Redirect to the homepage
    navigate('/');
  };

  const showSidebar = () => setSidebar(!sidebar);

  const toggleProfileBox = () => {
    setShowProfileBox(!showProfileBox);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} style={{ color: "white" }} />
          </NavIcon>
          <h1 style={{ color: "white" }}>Matrical</h1>
          <div className="mode size65" style={{ position: "relative" }}>
            {/* Profile Icon */}
            <ProfileIcon onClick={toggleProfileBox}>
              {loggedInEmployee && loggedInEmployee.fullname && (
                <span className="profile-initial">{loggedInEmployee.fullname.charAt(0)}</span>
              )}
            </ProfileIcon>
            {/* Profile Box */}
            <ProfileBox showProfileBox={showProfileBox}>
        {loggedInEmployee && (
          <>
            <p>{loggedInEmployee.fullname}</p>
            <p>EMP ID: {loggedInEmployee.employeeid}</p>
            <p>EMP Email: {loggedInEmployee.email}</p>
          </>
        )}
        <button onClick={handleLogout} style={{ backgroundColor: "rgb(0, 7, 61)", color: "white" }}>
          Logout
        </button>
      </ProfileBox>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {Sidebarda1.map((item, index) => {
              return <Submen1 item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sideba1;








// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { Sidebarda1 } from "./Sidebarda1";
// import Submen1 from "./Submen1";
// import { IconContext } from "react-icons/lib";
// import { FaSun, FaMoon, FaUser } from "react-icons/fa";
// import './Sidebar.css';
// import { useNavigate } from 'react-router-dom';




// const Nav = styled.div`
// background: rgb(0, 7, 61);
//   position: fixed;
//   margin-right:5px;
//   width: 100%;
//   color: #fff;
//   height: 80px;
//   display: flex;
//   margin-bottom: 540px;
//   justify-content: space-between;
//   align-items: center;
//   transition: background 0.3s, color 0.3s;
//  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//  z-index:99;
//  top:0;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   color: #fff;
// `;

// const ProfileIcon = styled.div`
//   font-size: 1.5rem;
//   margin-right: 20px;
//   cursor: pointer;
// `;

// const ProfileBox = styled.div`
//   position: absolute;
//   top: 49px;
//   right: 5px;
//   background: darkblue;
//   width:max-content;
//   block-size:max-content;
//   color:white;
//   padding: 10px;
//   border-radius: 5px;
//   display: ${({ showProfileBox }) => (showProfileBox ? "block" : "none")}

// `;

// const SidebarNav = styled.nav`
//   background: rgb(0, 7, 61) ;
//   color: #fff;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: flex-start;
//   margin-left:0px;
//   position: fixed;
  
//   left: ${({ sidebar }) => (sidebar ? "0" : "-247px")};
//   transition: left 350ms;
//   z-index: 99;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
//   overflow-y: auto;
//   background: #15171c;
//   color: #fff;
// `;

// const Sideba1 = () => {
//   const [sidebar, setSidebar] = useState(true);
//   const [showProfileBox, setShowProfileBox] = useState(false);
  

//   const [loggedInEmployee, setLoggedInEmployee] = useState(null);
//   const [setStaffList] = useState([]);
//   const [matchingStaff, setMatchingStaff] = useState(null);


//   const navigate = useNavigate(); // Accessing the useNavigate hook


//   useEffect(() => {
//     // Load employee details from localStorage when component mounts
//     const storedEmployee = localStorage.getItem('loggedInEmployee');
//     if (storedEmployee) {
//       setLoggedInEmployee(JSON.parse(storedEmployee));
//     }
//   }, []);

//   useEffect(() => {
//     fetchStaffList();
//   }, []);

//   const fetchStaffList = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/employee_data");
//       if (Array.isArray(response.data.data)) {
//         setStaffList(response.data.data);
//         const foundStaff = response.data.data.find(
//           (staff) => staff.staffid === logstaffid
//         );
//         if (foundStaff) {
//           setMatchingStaff(foundStaff); 
//         }
//       } else {
//         console.error("Invalid data received from the server:", response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching staff list:", error);
//     }
//   };

 

//   const handleLogout = () => {
//     // Clear the stored employee details from state and localStorage on logout
//     setLoggedInEmployee(null);
//     localStorage.removeItem('loggedInEmployee');
//     // Perform logout logic if needed
//     console.log("Logout ");
//     // Redirect to the homepage
//     navigate('/');
//   };

//   const showSidebar = () => setSidebar(!sidebar);

//   const toggleProfileBox = () => {
//     setShowProfileBox(!showProfileBox);
//   };

//   return (
//     <>
//       <IconContext.Provider value={{ color: "#fff" }}>
//         <Nav>
//           <NavIcon to="#">
//             <FaIcons.FaBars onClick={showSidebar} style={{ color: "white" }} />
//           </NavIcon>
//           <h1 style={{ color: "white" }}>Matrical</h1>
//           <div className="mode" style={{ position: "relative" }}>
//             {/* Profile Icon */}
//             <ProfileIcon onClick={toggleProfileBox}>
//               <FaUser />
//             </ProfileIcon>
//             {/* Profile Box */}
//             <ProfileBox showProfileBox={showProfileBox}>
//         {loggedInEmployee && (
//           <>
//             <p>{loggedInEmployee.fullname}</p>
//             <p>EMP ID: {loggedInEmployee.employeeid}</p>
//             <p>EMP Email: {loggedInEmployee.email}</p>
//           </>
//         )}
//         <button onClick={handleLogout} style={{ backgroundColor: "rgb(0, 7, 61)", color: "white" }}>
//           Logout
//         </button>
//       </ProfileBox>
//           </div>
//         </Nav>
//         <SidebarNav sidebar={sidebar}>
//           <SidebarWrap>
//             <NavIcon to="#">
//               <AiIcons.AiOutlineClose onClick={showSidebar} />
//             </NavIcon>
//             {Sidebarda1.map((item, index) => {
//               return <Submen1 item={item} key={index} />;
//             })}
//           </SidebarWrap>
//         </SidebarNav>
//       </IconContext.Provider>
//     </>
//   );
// };

// export default Sideba1;