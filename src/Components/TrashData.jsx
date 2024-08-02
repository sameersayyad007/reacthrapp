import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = 'https://dev.maxdigi.co/assignement-hr/api';

export default function TrashData() {
  const [trashData, setTrashData] = useState([]);

  const getTrashData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/leave?status=0`);
      if (response.data) {
        setTrashData(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setTrashData([]);
      }
    } catch (error) {
      console.error('Error fetching trash data:', error);
    }
  };

  useEffect(() => {
    getTrashData();
  }, []);

  const restoreLeave = async (leaveID) => {
    try {
      const response = await axios.post(`${apiUrl}/leave/trashrestore`, { 
        ids: leaveID,
        action: 'restore',
       });
      if (response.data) {
        alert('restored successfully!')
        getTrashData();
      } else {
        console.error('Failed to restore data:', response.data.message);
      }
    } catch (error) {
      console.error('Error restoring data:', error);
    }
  };
  

  return (
    <div className="App1">
      <h3>Trashed Leave Data</h3>
      <Link to="/dashboard">Back to Dashboard</Link>
      <table className="leave-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Leave type</th>
            <th>Reason</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trashData.length !== 0 &&
            trashData.map((item) => (
              <tr key={item.leaveID}>
                <td>{item.leaveID}</td>
                <td>{item.leaveType}</td>
                <td>{item.reason}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td><button className='edit' onClick={() => restoreLeave(item.leaveID)}>Restore</button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
