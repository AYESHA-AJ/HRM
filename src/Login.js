import React, { useState } from 'react';
import './Login.css';
import Logo from './src assets/codistanlogo.png';
import LoginPic from './src assets/Pic.png';
import EyeIcon from './src assets/eye icon.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginClick,handleSignUpClick }) => {
  const [loginType, setLoginType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isClicked, setIsClicked] = useState(false);


  const navigate = useNavigate();
   const handleSignUp = () => {
     // Set the state to true when sign-up button is clicked
    handleSignUpClick(); // Pass the event to the parent component
  };

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

  const handleLoginType = (type) => {
    setLoginType(type);
    // Reset form state
    setUsername('');
    setPassword('');
    setUsernameError('');
    setPasswordError('');
    setShowPassword(false);
  };

  const handleSubmit = () => {
    if (username.trim() === '') {
      setUsernameError('Username is required');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
    }

    if (username.trim() !== '' && password.trim() !== '') {
      // Here you can handle login based on the selected login type
      if (loginType === 'admin') {
        // Handle admin login
      } else if (loginType === 'employee') {
        // Handle employee login
      } else if (loginType === 'applicant') {
        // Handle applicant login
      }
      onLoginClick(loginType); // Pass the loginType to the onLoginClick function
    }
  };

  const renderWelcomeMessage = () => {
    switch (loginType) {
      case 'admin':
        return <p>Welcome Admin</p>;
      case 'employee':
        return <p>Welcome Employee</p>;
      case 'applicant':
        return <p>Welcome Applicant</p>;
      default:
        return null;
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
          <button className="admin-button" onClick={() => handleLoginType('admin')} >Admin</button>
          <button className="employee-button" onClick={() => handleLoginType('employee')}>Employee</button>
          <button className="applicant-button" onClick={() => handleLoginType('applicant')}>Applicant</button>
        </div>
        <div className="sign-in-text">
          <p>Sign in</p>
        </div>
        <p>
              Not registered yet?{' '}
              <button onClick={handleSignUp}>Sign Up</button>
</p>
            
        {renderWelcomeMessage()}
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
