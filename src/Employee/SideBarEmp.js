import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./SideBarEmp.css"

const routes = [
  {
    path: "/Dashboard2",
    name: "Dashboard",
    icon: <FaHome />,
  },
  // {
  //   path: "/users",
  //   name: "Users",
  //   icon: <FaUser />,
  // },
  // {
  //   path: "/messages",
  //   name: "Messages",
  //   icon: <MdMessage />,
  // },
  // {
  //   path: "/analytics",
  //   name: "Analytics",
  //   icon: <BiAnalyse />,
  // },
  {
    path: "/employeeleave",
    name: "Leave",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/Leave2",
        name: "Apply Leave ",
        icon: <IoIcons.IoIosPaper />,
      }
      
    ],
  },
  // {
  //   path: "/order",
  //   name: "Payrole",
  //   icon: <BsCartCheck />,
  // },
  {
    // path: "/Payslip2",
    name: "Payrole",
    icon: <IoIcons.IoMdPeople />,
    exact: true,
    subRoutes: [
      {
        path: "/Payslip2",
        name: "Pay-slip ",
        icon: <IoIcons.IoIosPaper />,
      }
      
    ],
  },

  {
    // path: "/Payslip2",
    name: "Holiday",
    icon: <FaIcons.FaCalendarCheck />,
    exact: true,
    subRoutes: [
      {
        path: "/Holiday2",
        name: "Holiday List ",
        icon: <IoIcons.IoIosCalendar />,
      }
      
    ],
  },

  {
    path: "/CompanyDetails2",
    name: "Company Details",
    icon: <FaRegBuilding />,
  },

  {
    path: "/",
    name: "LogOut",
    icon: <AiIcons.AiOutlineLogout />,
  }

];

const SideBarEmp = ({ children }) => {
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
      <div className="main-container23">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar23 `}
        >
          <div className="top_section23">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo23"
                >
                  Matrical
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars23">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search23">
            <div className="search_icon23">
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
          <section className="routes23">
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
                  className="link23"
                  activeClassName="active23"
                >
                  <div className="icon23">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text23"
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

export default SideBarEmp;