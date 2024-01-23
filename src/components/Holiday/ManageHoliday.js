import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageHoliday.css';
import Sidebar from '../Sidebar';
import { BASE_URL } from '../../Helper/Helper';

const ManageHoliday = () => {
  const [holidayList, setHolidayList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    setLoading(true);
    setError(null);

    axios
      .get(`${BASE_URL}/holiday_data`)
      .then(response => {
        const fetchedData = response.data;
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
    if (isEditMode) {
      const updatedList = [...holidayList];
      updatedList[index].date = event.target.value;
      setHolidayList(updatedList);
    }
  };

  const handleDescriptionChange = (event, index) => {
    if (isEditMode) {
      const updatedList = [...holidayList];
      updatedList[index].description = event.target.value;
      setHolidayList(updatedList);
    }
  };

  const handleCheckboxChange = (event, index) => {
    if (isEditMode) {
      const updatedList = [...holidayList];
      updatedList[index].isSelected = !updatedList[index].isSelected;
      setHolidayList(updatedList);

      const selectedRecord = updatedList[index];
      const updatedSelectedRecords = selectedRecord.isSelected
        ? [...selectedRecords, selectedRecord]
        : selectedRecords.filter(record => record.slno !== selectedRecord.slno);

      setSelectedRecords(updatedSelectedRecords);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUpdateClick = () => {
    if (isEditMode) {
      const selectedForUpdate = holidayList.filter(record => record.isSelected);
      
      if (selectedForUpdate.length > 0) {
        axios
          .put(`${BASE_URL}/holiday_data`, selectedForUpdate)
          .then(() => {
            alert('Updated Successfully');
          })
          .catch(error => {
            alert('Not Updated Successfully', error);
          });
      } else {
        alert('Please select records to update');
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className='homeyogi'>
        <div className='outsideborderyogi'>
          <div className='dailyyogi'>
            <h1 className='manage-employeeyogi'>Holiday List</h1>
            <h1 className='lineyogi'></h1>

            <table className='holiday-tableyogi'>
              <tbody>
                {holidayList.map((holiday, index) => (
                  <tr key={holiday.slno}>
                    <td>{holiday.slno}</td>
                    <td>
                      <input
                        type='date'
                        value={holiday.date}
                        onChange={event => handleDateChange(event, index)}
                        disabled={!isEditMode}
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        value={holiday.description}
                        onChange={event => handleDescriptionChange(event, index)}
                        disabled={!isEditMode}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        checked={holiday.isSelected}
                        onChange={event => handleCheckboxChange(event, index)}
                        disabled={!isEditMode}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='M1yogi'>
            <div>
              <button className='manage-buttonyogi' onClick={handleEditClick}>
                {isEditMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div>
              <button className='manage-buttonyogi' onClick={handleUpdateClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageHoliday;