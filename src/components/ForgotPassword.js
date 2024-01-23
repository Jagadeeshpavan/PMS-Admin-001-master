// ForgotPassword.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import LoginMern from './LoginMern';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling the forgot password submission
    console.log('Email submitted:', email);
  };

  return (
    <div className="body-forgot">
      
      <form onSubmit={handleSubmit} className="forgot-form">

        <div className="forgot-container">
        <h1 className="forgot-h1">Forgot Password</h1>
          <div className="forgot-group">
            <label htmlFor="email" className="forgot-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-input"
            />
          </div>

          <button type="submit" className="forgot-submit">
            SUBMIT
          </button>

          <p className="forgot-link">
            Remember your password? <a href='/'>Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;