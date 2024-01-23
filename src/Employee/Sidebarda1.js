import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";


export const Sidebarda1 = [
  {
    title: "Dashboard",
    path: "/Dashboard2",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Leave",
    // path: "/Leave",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Apply Leave",
        path: "/Leave2",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      
    ],
  },
  {
    title: "Payroll",
    // path: "/Payroll",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Pay slip",
        path: "/Payslip2",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      
    ],
  },
  {
    title: "Holiday",
    // path: "/Holiday",
    icon: <FaIcons.FaCalendarCheck />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Holiday List",
        path: "/Holiday2",
        icon: <IoIcons.IoIosCalendar />,
      },
     
    ],
  },
 

     
  {
    title: "Company Details",
    path: "/CompanyDetails2",
    icon: <FaRegBuilding />, 
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Logout",
    path: "/",
    icon: <AiIcons.AiOutlineLogout />, 
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
// Sidebarda1.js