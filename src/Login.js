import React, { useState } from 'react';
import './Login.css';
import Logo from './src assets/codistanlogo.png';
import LoginPic from './src assets/Pic.png';
 
import EyeIcon from './eye icon.png';
 
 
const Login = ({ onLoginClick }) => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
 
 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError('');
  };
 
 
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };
 
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
 
  const handleSubmit = () => {
    if (username.trim() === '') {
      setUsernameError('Username is required');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
    }
 
    if (username.trim() !== '' && password.trim() !== '') {
      onLoginClick();
    }
  };
 
 
  return (
    <div className="login-container">
      <div className="left-side">
        <img src={Logo} alt="Login Pic" className="logo" />
        <img src={LoginPic} alt="Login Pic" className="login-pic" />
      </div>
      <div className="right-side">
        <div className="welcome-text">
          <p>Welcome to HRM</p>
          <hr className="horizontal-line" />
        </div>
        <div className="buttons-container">
          <button className="admin-button">Admin</button>
          <button className="employee-button">Employee</button>
        </div>
        <div className="sign-in-text">
          <p>Sign in</p>
        </div>
        <div className="input-container username-container">
          <input
            type="text"
            placeholder=" "
            className={`username-input ${usernameError && 'input-error'}`}
            value={username}
            onChange={handleUsernameChange}
          />
          <label className={`label ${username && !usernameError && 'has-content'}`}>Username*</label>
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>
        <div className="input-container password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder=" "
            className={`password-input ${passwordError && 'input-error'}`}
            value={password}
            onChange={handlePasswordChange}
          />
          <label className={`label ${password && !passwordError && 'has-content'}`}>Password*</label>
          <img
            src={EyeIcon}
            alt="Show/Hide Password"
            className="eye-icon"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div className="remember-me">
          <input type="checkbox" /> Remember me
          <div className="forgot-password">
    <a href="#" className="forgot-password-link">Forgot Password?</a>
  </div>
        </div>
       
        <button className="login-button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};
 
 
export default Login;