import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css';


export default function Login() {
  const navigate = useNavigate();
  const[errors,setErrors] = useState({})

  const handleLogin = () => {
    navigate('/profile');
  };

  return (
    <div className="mainloginPage">
      <div className="loginPage">
        <h1>LOGIN</h1>
        <div className="loginForm">
          <form>
            <label htmlFor="email">Email</label><br/><br/>
            <input type="email" name="email" id="email" placeholder="Enter email address" /><br/><br/>
            {errors.email && <span className='text-danger'> {errors.email}</span>}
            <label htmlFor="password">Password</label><br/><br/>
            <input type="password" name="password" id="password" placeholder="Enter password" /><br/><br/>
            <center><button type="button" onClick={handleLogin}>Login</button><br/>
            <Link to="/Forgetpassword">Forgot password</Link><br/><br/>
            <button type="button" className="sign-up">Signup Here!</button></center>
          </form>
        </div>
      </div>
    </div>
  );
}
