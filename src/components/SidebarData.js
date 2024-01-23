// SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/Dashboard",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Employee",
    
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Add Employee",
        path: "/Add_Employee",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Manage Employee",
        path: "/ManageEmployee",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Department",
    
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Add_Department",
        path: "/Department",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Manage Department",
        path: "/ManageDepartment",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Attendance",
    
    icon: <FaIcons.FaCalendarCheck />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Daily-Attendance",
        path: "/Attendance",
        icon: <IoIcons.IoIosCalendar />,
      },
      {
        title: "Attendance_Report",
        path: "/Reports",
        icon: <IoIcons.IoIosClipboard />,
      },
    ],
  },
  {
    title: "Payroll",
    
    icon: <IoIcons.IoMdCash />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Payslip",
        path: "/Payroll",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "All-Payslips",
        path: "/DisplaySalaryData",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Holiday",
    
    icon: <IoIcons.IoIosSnow />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Add Holiday",
        path: "/AddHoliday",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Manage Holiday",
        path: "/ManageHoliday",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Admin",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: "Add Admin",
          path: "/Admin",
          icon: <IoIcons.IoIosPaper />,
          cName: "sub-nav",
        },
        {
          title: "Manage Admin",
          path: "/Manageadmin",
          icon: <IoIcons.IoIosPaper />,
          cName: "sub-nav",
        },
      ],
  },



  {
    title: "Logout",
    path: "/",
    icon: <AiIcons.AiOutlineLogout />, 
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
