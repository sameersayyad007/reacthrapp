// src/services/api.js
import axios from 'axios';

const API_URL = 'https://dev.maxdigi.co/assignement-hr/api';

export const loginUser = async (userEmail, userPass) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      userEmail,
      userPass
    });
    return response.data;
  } catch (error) { 
    console.error('Login Error:', error);
    throw error;
  }
};

export const registerUser = async (userName, userEmail, userMobile, userPass,userCPass) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
      userName,
      userEmail,
      userMobile,
      userPass,
      userCPass
      
    });
    return response.data;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

export const markAttendance = async (userID, markInTime, jwtToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/attendence`,
      { userID, markInTime },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    throw error;
  }
};

export const markOutAttendance = async (userID, markOutTime, jwtToken) => {
  try {
    const response = await axios.post(
      `${API_URL}/attendence/${userID}`,
      { userID, markOutTime },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Mark Out Attendance Error:', error);
    throw error;
  }
};

