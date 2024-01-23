import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import Submen1 from "./Submenu";
import { IconContext } from "react-icons/lib";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import "./Sidebar.css";



const Nav = styled.div`
background: rgb(0, 7, 61);
  position: fixed;
  margin-right: -365px;
  margin-bottom: 26%;
  width: 100%;
  color: #fff;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s, color 0.3s;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

// const ProfileIcon = styled.div`
//   font-size: 1.5rem;
//   margin-right: 20px;
//   cursor: pointer;
// `;


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
  top: 57px;
  right: 1px;
  background: blue;
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
  top: fixed;
  left: ${({ sidebar }) => (sidebar ? "0" : "-247px")};
  transition: left 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  overflow-y: auto;
  background: #15171c;
  color: #fff;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
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
            <p>ADM ID: {loggedInEmployee.adminid}</p>
            <p>ADM Email: {loggedInEmployee.email}</p>
          </>
        )}
             
              <button onClick={ handleLogout } style={{backgroundColor:"rgb(0, 7, 61)" , color:"white"}}>Logout</button>
              {/* <button onClick={handleLogout}  className="customButton">
      Logout
    </button> */}
            </ProfileBox>
          </div>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <Submen1 item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;