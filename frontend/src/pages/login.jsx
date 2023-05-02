import React from 'react';
import './styles/login.scss';

export default function Login() {
  return (
    <div className="container page-container right-page-container form-container">
      <h1 className="login-title">Login</h1>
      <p className="subtitle">Login To Your Account!</p>
      <form>
        <div className="info">
          <div>
            <input type="email" placeholder="Enter Email" className="email-input h" />
          </div>
          <div>
            <input type="password" placeholder="Enter Password" className="password-input h" />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}


