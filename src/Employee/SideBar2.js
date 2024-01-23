import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { AiOutlineBorder } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { AiOutlineLogout } from "react-icons/ai";
import { FcLeave } from "react-icons/fc";
import { AiOutlineIdcard } from "react-icons/ai";
import { FaListAlt } from "react-icons/fa";
import './Sidebar.css'
const routes = [
  {
    path: "/Clock",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/Leave",
    name: "leave",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/Leave",
        name: "Apply Leave ",
        icon: <FcLeave  />,
      },
    ]
    
  },
  {
    // path: "/Payroll",
    name: "Payroll",
    icon: <MdMessage />,
    subRoutes: [
      {
        path: "/Payroll",
        name: "Payslip ",
        icon: <AiOutlineIdcard  />,
      },]
  },
  {
    path: "/Holiday",
    name: "Holiday",
    icon: <BiAnalyse />,
    subRoutes: [
      {
        path: "/GetHolidayList",
        name: "Holiday list ",
        icon: <FaListAlt />,
      },]
     
  },
  {
    path: "/CompanyDetails",
    name: "Company Details",
    icon: <AiOutlineBorder />,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: <AiOutlineLogout/>,
  },
 
 

];

const SideBar2 = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Employee
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar2;