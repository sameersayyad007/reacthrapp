import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); 
   
    if (!userEmail) {
      setError('Email is required');
      return;
    }
    if ( !userPass) {
      setError(' password is required');
      return;
    }

    try {
      const data = await loginUser(userEmail, userPass);
      localStorage.setItem('jwtToken', data.data.token);
      console.log('Login successful:', data);
     if(data.data.token){
      onLogin();
      navigate('/dashboard');
     }
     else{
      setError('Invalid email or password');
     }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <label htmlFor="">
        Enter Email: &nbsp;
        <input type="email" placeholder="EMAIL" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="">
        Enter Password: &nbsp;
        <input type="password" placeholder="PASS" value={userPass} onChange={(e) => setUserPass(e.target.value)} />
      </label>
      <br />
      {error && <div className="error">{error}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
