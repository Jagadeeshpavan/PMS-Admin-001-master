


import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./DigitalClock.css";
import Sideba1 from "../Sideba1";
import Calender from "../Calender";
// import SideBarEmp from "../SideBarEmp";

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [enteredId] = useState("");
  const [, setEmployeeId] = useState("");
  const [isDayStarted, setIsDayStarted] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [startOfWorkday, setStartOfWorkday] = useState(null);
  const [endOfWorkday, setEndOfWorkday] = useState(null);
  const [showSeeYouMessage, setShowSeeYouMessage] = useState(false);
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);
  const [loggedInEmployeeOne, setLoggedInEmployeeOne] = useState(null);
  const [workdays, setWorkdays] = useState([]);
  const [isBreakStarted, setIsBreakStarted] = useState(false);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [breakEndTime, setBreakEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isWorkdayStarted, setIsWorkdayStarted] = useState(false);
  const [isWorkdayEnded, setIsWorkdayEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchLoggedInEmployee = async () => {
      try {
        const response = await fetch("http://localhost:5000/LoggedInEmployee");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data);
        setLoggedInEmployee(data);
        setEmployeeId(data?.employeeId || "");
      } catch (error) {
        console.error("Error fetching logged-in employee:", error);
      }
    };

    fetchLoggedInEmployee();
  }, []);

  useEffect(() => {
    setEmployeeId(loggedInEmployee?.employeeId || "");
  }, [loggedInEmployee]);

  useEffect(() => {
    const storedEmployee = localStorage.getItem("loggedInEmployee");

    if (storedEmployee) {
      try {
        const parsedEmployee = JSON.parse(storedEmployee);
        setLoggedInEmployeeOne(parsedEmployee);
      } catch (error) {
        console.error("Error parsing loggedInEmployee:", error);
      }
    } else {
      console.log("No loggedInEmployee found in local storage");
    }
  }, []);

  useEffect(() => {
    updateCalendar();
  }, [workdays]);

  const handleStartOfWorkday = async () => {
    try {
      setIsLoading(true);
      await sendTimeDataToBackend("start", 0);
      setStartOfWorkday(new Date());
      setIsDayStarted(true);
      setCurrentDate(new Date().toLocaleString());
      setStartTime(new Date());
      setIsWorkdayStarted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  setTimeout(() => {
    setShowSeeYouMessage(false);
  }, 5000);

  const handleEndOfWorkday = () => {
    setEndOfWorkday(new Date());
    setIsDayStarted(false);
    setCurrentDate(new Date().toLocaleString());
    setShowSeeYouMessage(true);
    setEndTime(new Date());
  
    const timeDifference = endTime - startTime;
  
    if (!isWorkdayEnded) {
      setWorkdays((prevWorkdays) => {
        const updatedWorkdays = [...prevWorkdays];
        const currentDate = new Date().toLocaleDateString();
        const index = updatedWorkdays.findIndex(
          (workday) => workday.date === currentDate
        );
  
        if (index !== -1) {
          updatedWorkdays[index].secondsWorked = timeDifference / 1000;
        } else {
          updatedWorkdays.push({ date: currentDate, secondsWorked: timeDifference / 1000 });
        }
  
        return updatedWorkdays;
      });
  
      sendTimeDataToBackend("end", timeDifference / 1000);
      setIsWorkdayEnded(true);
    }
  };
  

  const handleBreakIn = () => {
    if (!isBreakStarted) {
      setBreakStartTime(new Date());
      setIsBreakStarted(true);
      sendTimeDataToBackend("breakIn");
    } else {
      alert("Break In already recorded.");
    }
  };

  const handleBreakOut = () => {
    if (isBreakStarted) {
      setBreakEndTime(new Date());
      setIsBreakStarted(false);
      sendTimeDataToBackend("breakOut");
    } else {
      alert("Break Out cannot be recorded without Break In.");
    }
  };

  const sendTimeDataToBackend = async (status, secondsWorked) => {
    try {
      if (!loggedInEmployeeOne) {
        alert("Please enter your ID number.");
        return;
      }
  
      const formattedHoursWorked = new Date(secondsWorked * 1000)
        .toISOString()
        .substr(11, 8);
  
        const timeData = {
          employeeId: loggedInEmployeeOne.employeeid,
          status: status,
        };
        
  
      const response = await fetch("http://localhost:5000/Employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeData),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Data sent successfully:", data);
      updateCalendar();
    } catch (error) {
      console.error('Error sending data to the server:', error);
      // Log the full error details for debugging
      console.error(error);
  
      // Notify the user about the error
      alert('Error sending data to the server. Please try again.');
    }
  };
  

  const updateCalendar = () => {
    fetch(`http://localhost:5000/EmployeeCalendar/${enteredId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setWorkdays(data);
      })
      .catch((error) => {
        console.error("There was an error fetching workday data:", error);
      });
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <>

      <Sideba1 />
      <div className="masterc-container123">
        
        <div>
          <div className="digital-clock-container">
            <Clock
              value={currentTime}
              renderNumbers={true}
              hourMarksLength={20}
              minuteMarksLength={10}
            />

            <div className="flex23">
              <div>
                {loggedInEmployeeOne && (
                  <p className="p_enteredid">
                    {" "}
                    LOGIN ID: {loggedInEmployeeOne.employeeid}
                  </p>
                )}
              </div>
              <div>
                {!isDayStarted ? (
                  <button
                    className="workday-buttons start-day"
                    onClick={handleStartOfWorkday}
                  >
                    {" "}
                    Start Workday{" "}
                  </button>
                ) : (
                  <>
                    <button
                      className={`workday-buttons ${
                        isBreakStarted ? "break-out" : "break-in"
                      }`}
                      onClick={isBreakStarted ? handleBreakOut : handleBreakIn}
                    >
                      {isBreakStarted ? "Break Out" : "Break In"}
                    </button>
                    <button
                      className="workday-buttons end-day"
                      onClick={handleEndOfWorkday}
                    >
                      End Workday
                    </button>
                  </>
                )}
              </div>
            </div>

            {(startOfWorkday || endOfWorkday) && (
              <p className="daystart">
                {isDayStarted ? "Start of Workday" : "End of Workday"}:{" "}
                {currentDate}
              </p>
            )}
            {showSeeYouMessage && (
              <div className="popup">
                <p>Your day is end...! See you tomorrow!</p>
              </div>
            )}

            <marquee className="dark-blue-text" direction="left">
              Punctuality matters! Arrive on time and punch in promptly to start your day
            </marquee>
          </div>
        </div>
        <div>
          <Calender
            workdays={workdays}
            isToday={isToday}
            isWorkdayStarted={isWorkdayStarted}
          />
        </div>
      </div>
    </>
  );
};

export default DigitalClock;