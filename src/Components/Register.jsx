import React, { useState } from 'react';
import { registerUser } from '../services/api';

export default function Register() {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userName, setUserName] = useState('');
  const [userMobile, setMobile] = useState('');
  const [userCPass, setUserCPass] = useState('');

  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    const newErrors = {};
    if (!userName) newErrors.userName = 'Name is required';
    if (!userEmail) newErrors.userEmail = 'Email is required';
    else if (!validateEmail(userEmail)) {
      newErrors.userEmail = 'Invalid email format';
    }
    if (!userMobile) newErrors.userMobile = 'Mobile number is required';
    else if (userMobile.length>10) {
      newErrors.userMobile = 'Mobile number cannot be greater than 10 digits';
    }
    if (!userPass) newErrors.userPass = 'Password is required';
    if (userPass !== userCPass) newErrors.userCPass = 'Passwords do not match';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const data = await registerUser(userName, userEmail, userMobile, userPass, userCPass);
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  return (
    <div className="App">
      <h1>Register User</h1>
      <label htmlFor="">
        Enter Name: &nbsp;
        <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        {errors.userName && <div className="error">{errors.userName}</div>}
      </label>
      <label htmlFor="">
        Enter Email: &nbsp;
        <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
        {errors.userEmail && <div className="error">{errors.userEmail}</div>}
      </label>
      <label htmlFor="">
        Enter Password: &nbsp;
        <input type="password" placeholder="Password" value={userPass} onChange={(e) => setUserPass(e.target.value)} />
        {errors.userPass && <div className="error">{errors.userPass}</div>}
      </label>
      <label htmlFor="">
        Confirm Password: &nbsp;
        <input type="password" placeholder="Confirm Password" value={userCPass} onChange={(e) => setUserCPass(e.target.value)} />
        {errors.userCPass && <div className="error">{errors.userCPass}</div>}
      </label>
      <label htmlFor="">
        Enter Mobile Number: &nbsp;
        <input type="number" placeholder="Mobile" value={userMobile} onChange={(e) => setMobile(e.target.value)} />
        {errors.userMobile && <div className="error">{errors.userMobile}</div>}
      </label>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
