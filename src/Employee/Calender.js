import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calender = () => {
  const monthNames = [
  "January","February","March","April","May","June","July","August","September","October","November","December",
  ];
  const [enteredId, setEnteredId] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalHolidays, setTotalHolidays] = useState(0);
  const [totalPublicHolidays, setTotalPublicHolidays] = useState(0);
  const [publicHolidays, setPublicHolidays] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);
  const [loggedInEmployeeOne, setLoggedInEmployeeOne] = useState(null);
  const [publicHolidaysData, setPublicHolidaysData] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    // name: "P.A.Naga Pavan Kumar Reddy",
    // designation: "Full Stack Java Developer"
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const [attendance, setAttendance] = useState({});
  const [isWorkdayStarted, setIsWorkdayStarted] = useState(false); 

  useEffect(() => {
    fetchCalendarEvents();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchPublicHolidays();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const initialAttendance = {};
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = `${(selectedMonth + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      initialAttendance[formattedDate] = "";
    }
    setAttendance(initialAttendance);
  }, [selectedMonth, selectedYear]);

  const fetchCalendarEvents = async () => {
    try {
      const startOfMonth = new Date(selectedYear, selectedMonth, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

      const response = await fetch(
        `http://localhost:5002/api/calendar?start=${startOfMonth}&end=${endOfMonth}`
      );
      const data = await response.json();

      setCalendarEvents(data.calendarEvents);

      const { name, designation } = data.employeeDetails ?? {};
      setEmployeeDetails({ name, designation });

      updateTotalHolidays(selectedYear, selectedMonth, data.calendarEvents);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  const fetchPublicHolidays = async () => {
    try {
      const apiKey = "aW6uUfw2VkQzI2EmK38gkW4uA0d3AWXw";
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=IN&year=${selectedYear}&month=${selectedMonth + 1}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const publicHolidaysData = data.response.holidays.map((holiday) => {
        const date = holiday.date.iso || holiday.date.datetime || holiday.date.date;
        return {
          date: new Date(date).toISOString().split("T")[0],
          name: holiday.name,
        };
      });

      setPublicHolidaysData(publicHolidaysData);
      console.table(publicHolidaysData);

      const uniquePublicHolidays = new Set(publicHolidaysData.map((holiday) => holiday.date));
      setPublicHolidays(Array.from(uniquePublicHolidays));
    } catch (error) {
      console.error("Error fetching public holidays:", error);
    }
  };

  const updateTotalHolidays = (year, month, events) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    let holidays = 0;
    let publicHolidaysCount = 0;

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = (firstDayOfMonth + i - 1) % 7;

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        holidays += 1;
      }

      const formattedDate = `${(month + 1).toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`;
      const isPublicHoliday = events.some(
        (event) => new Date(event.date).getDate() === i
      );

      if (isPublicHoliday) {
        publicHolidaysCount += 1;
      }
    }

    setTotalHolidays(holidays);
    setTotalPublicHolidays(publicHolidaysCount);
  };
  useEffect(() => {
    const fetchLoggedInEmployee = async () => {
      try {
        const response = await fetch('http://localhost:5000/LoggedInEmployee');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log(data)
        setLoggedInEmployee("data",data);
        setEnteredId(data?.employeeId || '');
      } catch (error) {
        console.error('Error fetching logged-in employee:', error);
      }
    };

    fetchLoggedInEmployee();
  }, []);
  useEffect(() => {
    setEnteredId(loggedInEmployee?.employeeId || '');
  }, [loggedInEmployee]);
  const fetchDesignation = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:5000/employee_data/${employeeId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data.departmentname; 
    } catch (error) {
      console.error('Error fetching designation:', error);
      return null;
    }
  };
  
  useEffect(() => {
    const storedEmployee = localStorage.getItem('loggedInEmployee');
    console.log("storedEmployee", storedEmployee);
  
    if (storedEmployee) {
      try {
        const parsedEmployee = JSON.parse(storedEmployee);
        console.log("parsedEmployee", parsedEmployee);
        setLoggedInEmployeeOne(parsedEmployee);
      } catch (error) {
        console.error('Error parsing loggedInEmployee:', error);
      }
    } else {
      console.log('No loggedInEmployee found in local storage');
    }
  }, []);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
  const todayDate = new Date().getDate();
  const [workdays, setWorkdays] = useState([]);
  const handleDateClick = (day) => {
    const formattedDate = `${(selectedMonth + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const handleMonthChange = (delta) => {
    setSelectedMonth((prevMonth) => {
      let newMonth = prevMonth + delta;
      let newYear = selectedYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      setSelectedYear(newYear);
      return newMonth;
    });
  };

  const handleAttendanceSelection = (option) => {
    setAttendance((prevAttendance) => {
      const newAttendance = { ...prevAttendance };
      newAttendance[selectedDate] = option;
      return newAttendance;
    });
  };

  const generateCalendar = () => {
    const calendar = [];
    let currentWeek = [];
    let sundaysCount = 0;

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(selectedYear, selectedMonth, i).getDay();
      const isSunday = dayOfWeek === 0;
      const isToday =
        i === todayDate &&
        selectedMonth === new Date().getMonth() &&
        selectedYear === new Date().getFullYear();
      const formattedDate = `${(selectedMonth + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      const holidayData = calendarEvents.find(
        (event) => {
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          const currentDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
          return eventDate === currentDate;
        }
      );
      let isPublicHoliday = publicHolidays.includes(formattedDate);

      const formattedHolidayDate = `${selectedYear}-${(selectedMonth + 1)
        .toString()
        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      isPublicHoliday = publicHolidays.includes(formattedHolidayDate);

      const holidayName = isPublicHoliday && holidayData ? holidayData.name : null;

      if (isSunday) {
        sundaysCount += 1;
      }

      currentWeek.push(
        <td
          key={i}
          className={`calendar-cell ${
            isSunday || isPublicHoliday ? "weekend" : ""
            } ${isPublicHoliday ? "holiday" : ""}`}
          onClick={() => handleDateClick(i)}
        >
          <div
            className={`calendar-cell-content ${
              isPublicHoliday || isSunday
                ? ""
                : attendance[formattedDate] === "Present"
                ? "present"
                : attendance[formattedDate] === "Leave"
                ? "leave"
                : attendance[formattedDate] === "WFH"
                ? "work-from-home" 
                : attendance[formattedDate] === "PL"
                ? "paid-leave" 
                : ""
            }`}
          >
            <b>{i}</b>
            <br />
            {isPublicHoliday ? "PH" : isSunday ? "Holiday" : isToday ? "Today" : isWorkdayStarted ? "Present" : attendance[formattedDate]}
            <br />
            {attendance[formattedDate] && attendance[formattedDate] !== "Leave" && attendance[formattedDate] !== "WFH" && attendance[formattedDate] !== "PL" && (
              <span className="hours-worked">{workdays.find(workday => workday.date === formattedDate)?.hoursWorked || 0} hrs</span>
            )}
          </div>
        </td>
      );

      if ((firstDayOfMonth + i) % 7 === 0) {
        calendar.push(<tr key={`week-${i / 7}`}>{currentWeek}</tr>);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      calendar.push(<tr key={`week-${daysInMonth / 7}`}>{currentWeek}</tr>);
    }

    return { calendar, sundaysCount };
  };

  const calculateWorkedDays = () => {
    let workedDays = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const formattedDate = `${(selectedMonth + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      const isLeave = ["Present", "WFH", "PL"].includes(attendance[formattedDate]);
      if (isLeave) {
        workedDays++;
      }
    }
    return workedDays;
  };
  
  const workedDays = calculateWorkedDays();
  const remainingLeaves = 2 - workedDays;
  const { calendar, sundaysCount } = generateCalendar();

  return (
    <div className="container001">
      <main className="main-content">
        <div className="bottom-container">
          <div className="bottom-container__left">
            <div className="detail-flex">
              <div className="cbox spending-box">
                <div className="centered-content">
                  <h3 className="section-header">Employee Name</h3>
                  <h4 className="section-input">{loggedInEmployeeOne?.fullname}</h4>

                  <hr />
                  <h3 className="section-header">Designation</h3>
                  <h4 className="section-input">{loggedInEmployeeOne?.role}</h4>

                </div>
              </div>
              <div className="detail-box">
                <h2 className="section-head34">Current session</h2>
                <table className="table-line56 ">
                  <tbody>
                    <tr>
                      <td className="tdclass">
                        <b>{daysInMonth}</b>
                      </td>
                      <td className="tdclass">
                        <b>{workedDays}</b>
                      </td>
                      <td className="tdclass">
                        <b>2</b>
                      </td>
                      <td className="tdclass">
                        <b>{publicHolidays.length}</b>
                      </td>
                      <td className="tdclass">
                        <b>{sundaysCount}</b>
                      </td>
                    </tr>
                    <tr>
                      <td className="tdclass">Total No. Of Days</td>
                      <td className="tdclass">Total No. Of Worked</td>
                      <td className="tdclass">Total No. Of Leave</td>
                      <td className="tdclass">Total No. of Holidays</td>
                      <td className="tdclass">Total No. of Sundays</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="overflow243">
              <div className="box-transaction-box">
                <div className="header-container">
                  <h3 className="section-header">calendar</h3>
                  <span className="span123">
                    {" "}
                    {monthNames[selectedMonth]} {selectedYear}
                  </span>
                  <div>
                    <button className="psv" onClick={() => handleMonthChange(-1)}>
                      Previous
                    </button>
                    <button className="psv" onClick={() => handleMonthChange(1)}>
                      Next
                    </button>
                  </div>
                </div>
                <table className="tbody56">
                  <tbody >
                    <tr>
                      <th className="thchange23">SUN</th>
                      <th className="thchange23">MON</th>
                      <th className="thchange23">TUE</th>
                      <th className="thchange23">WED</th>
                      <th className="thchange23">THUR</th>
                      <th className="thchange23">FRI</th>
                      <th className="thchange23">SAT</th>
                    </tr>
                    {calendar}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calender;
