import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Holiday2.css'
import Sideba1 from "../Sideba1";
import SideBarEmp from '../SideBarEmp';


const GetHolidayList2 = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    setLoading(true);
    setError(null);

    axios
      .get('http://localhost:5000/holiday_data')
      .then(response => {
        const fetchedData = response.data;
        console.log(fetchedData);
        const dataWithSlno = fetchedData.map(holiday => ({
          slno: holiday.slno,
          date: holiday.date,
          description: holiday.description,
          isSelected: false
        }));

        setHolidayList(dataWithSlno);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleDateChange = (event, index) => {
    const updatedList = [...holidayList];
    updatedList[index].date = event.target.value;
    setHolidayList(updatedList);
  };

  const handleDescriptionChange = (event, index) => {
    const updatedList = [...holidayList];
    updatedList[index].description = event.target.value;
    setHolidayList(updatedList);
  };

  const handleCheckboxChange = (event, index) => {
    const updatedList = [...holidayList];
    updatedList[index].isSelected = !updatedList[index].isSelected;
    setHolidayList(updatedList);
  };

 
  return (
    <div className='main-class76'>
      <SideBarEmp />
    <div className='container76'>
     
          <h1 className='holiday76'>Holiday List</h1>
          <hr className='hr76'></hr>
          <h1 className='line76'></h1>

         
          {loading ? (
            <p className='load76'>Loading...</p>
          ) : error ? (
            <p className='load76'>Error: {error}</p>
          ) : (
            <table className='employee-table76'>
              <thead>
                <tr>
                  <th>SL No</th>
                  <th>Date</th>
                  <th>Description</th>
                
                </tr>
              </thead>
              <tbody>
                {holidayList.map((holiday, index) => (
                  <tr key={holiday.slno}>
                    <td>{holiday.slno}</td>
                    <td>{new Date(holiday.date).toLocaleDateString('en-CA')}</td>
                    <td>{holiday.description}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        </div>
  );
};

export default GetHolidayList2;