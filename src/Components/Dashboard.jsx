import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EditData from './EditData';
import { useNavigate, useLocation } from 'react-router-dom';
import { CiTrash } from "react-icons/ci";
import AddLeave from './AddLeave';

const apiUrl = 'https://dev.maxdigi.co/assignement-hr/api';

export default function Dashboard() {
  const [leaveData, setLeaveData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [add, setAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const getData = async (page = 1) => {
    try {
      const response = await axios.get(`${apiUrl}/leave?show=60`, {
    //    params: { show: 10, page: page, fromDate, toDate }
      });
      if (response.data) {
        const data = response.data.data.map((item) => {
          return {
            ...item,
            reason: item.reason != null ? item.reason : '-',
            fromDate: item.fromDate != null ? item.fromDate : '-',
            toDate: item.toDate != null ? item.toDate : '-',
          }
        });
        setLeaveData(data);
        setTotalPages(Math.ceil(response.data.count / 10));
      } else {
        console.error('Unexpected response format:', response.data);
        setLeaveData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const editData = (item) => {
    setSelectedData(item);
    setEdit(true);
  };

  const handleSave = async (updatedData) => {
    setLeaveData((prevData) =>
      prevData.map((item) => (item.leaveID === updatedData.leaveID ? updatedData : item))
    );
    alert('Data edited successfully!');
    setEdit(false);
    await getData(currentPage);
    setSelectedData(null);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    const fromDate = searchParams.get('fromDate') || '';
    const toDate = searchParams.get('toDate') || '';
    setCurrentPage(page);
    setFromDate(fromDate);
    setToDate(toDate);
    getData(page);
  }, [location.search]);

  const handleAdd = async (newData) => {
    setLeaveData((prevData) => [...prevData, newData]);
    alert('Leave added successfully!');
    setAdd(false);
    await getData(currentPage);
  };

  if (edit && selectedData) {
    return <EditData selectedData={selectedData} onSave={handleSave} onCancel={handleCancel} />;
  }

  if (add) {
    return <AddLeave onSave={handleAdd} onCancel={handleCancel} />;
  }

  const addLeave = () => {
    setAdd(!add);
  }

  const sendToTrash = async (item) => {
    try {
      const response = await axios.post(`${apiUrl}/leave/trashrestore`, {
        ids: item.leaveID,
        action: 'trash',
      });
      if (response.status === 200) {
        setLeaveData(prevData => prevData.filter(data => data.leaveID !== item.leaveID));
        alert('Item sent to trash successfully!');
      } else {
        console.error('Failed to send item to trash:', response.data);
        alert('Failed to send item to trash');
      }
    } catch (error) {
      console.error('Error sending item to trash:', error);
      alert('Error sending item to trash');
    }
  };

  const openTrash = () => {
    navigate('/trash-data');
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const searchParams = new URLSearchParams({ page: newPage, fromDate, toDate });
      navigate(`?${searchParams.toString()}`);
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({ page: 1, fromDate, toDate });
    navigate(`?${searchParams.toString()}`);
    setCurrentPage(1); 
    getData(1);
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    const searchParams = new URLSearchParams({ page: 1 });
    navigate(`?${searchParams.toString()}`);
    setCurrentPage(1);
    getData(1);
  };

  return (
    <div className="App1">
      <h3>Welcome User</h3>
      <h3>Leave Data</h3>
      <div className='rta'>
        <button onClick={addLeave}>Add Leave</button>
        <button onClick={openTrash}>Trash <CiTrash /></button>
      </div>
      <div className='search-filters'>
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <table className="leave-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Leave type</th>
            <th>Reason</th>
            <th>From Date</th>
            <th>To Date</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.length !== 0 && leaveData.map((item) => (
            <tr key={item.leaveID}>
              <td>{item.leaveID}</td>
              <td>{item.leaveType}</td>
              <td>{item.reason}</td>
              <td>{item.fromDate}</td>
              <td>{item.toDate}</td>
              <button className='edit' onClick={() => editData(item)}>Edit</button>
              <td><button className='delete' onClick={() => sendToTrash(item)}>Send to trash</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <br />
    </div>
  );
}
