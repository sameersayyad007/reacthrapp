import React, { useState } from 'react';
import axios from 'axios';

const EditData = ({ selectedData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(selectedData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://dev.maxdigi.co/assignement-hr/api/leave/${formData.leaveID}`, formData);
      onSave(response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Leave Data</h3>
      <form>
        <label>
          Leave Type:
          <input type="text" name="leaveType" value={formData.leaveType} onChange={handleChange} />
        </label>
        <label>
          Reason:
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} />
        </label>
        <label>
          From Date:
          <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} />
        </label>
        <label>
          To Date:
          <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditData;
