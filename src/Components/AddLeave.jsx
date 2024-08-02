import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const apiUrl = 'https://dev.maxdigi.co/assignement-hr/api';

const AddLeave = ({ onSave, onCancel }) => {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/leave`, {
        leaveType,
        reason,
        fromDate,
        toDate,
      });
      if (response.status===200 ) {
        onSave(response.data.data); 
        alert('Leave added successfully!');
      } else {
        console.error('Failed to add leave:', response.data);
        alert('Failed to add leave');
      }
    } catch (error) {
      console.error('Error adding leave:', error);
      alert('Error adding leave');
    }
  };
  const onClickCancel=()=>{
    return(
        <Dashboard/>
    )
  }

  return (
    <div className="add-leave">
      <h3>Add Leave</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Leave Type:</label>
          <input type="text" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required />
        </div>
        <div>
          <label>Reason:</label>
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <div>
          <label>From Date:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
        </div>
        <div>
          <label>To Date:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClickCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddLeave;
