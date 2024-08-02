
import React, { useState } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import TrashData from './Components/TrashData';
import AddLeave from './Components/AddLeave';
import PrivateRoute from './Components/PrivateRoute';

function Navbar({isLoggedIn,setIsLoggedIn}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
     navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link onClick={handleLogout}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  return (
    <BrowserRouter>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
      </div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/dashboard' element={<PrivateRoute isLoggedIn={isLoggedIn} element={<Dashboard />} />} />
        <Route path="/trash-data" element={<PrivateRoute isLoggedIn={isLoggedIn} element={<TrashData />} />} />
        <Route path="/add-leave" element={<PrivateRoute isLoggedIn={isLoggedIn} element={<AddLeave />} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

