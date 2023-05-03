import React from 'react';
import './styles/register.scss';

export default function RegisterPage() {
  return (
    <div id='registration'>
      <div id="header">
        <h1>Register</h1>
        <p id='subtitle'>Register an Account To Have Us Manage Your Time!</p>
      </div>

      <form>
        <div id='name-container'>
          <input type='text' placeholder='First Name' />
          <input type='text' placeholder='Last Name' />
        </div>
        <input type='email' placeholder='Enter Email' />
        <input type="date" />
        <input type='password' placeholder='Enter Password' />
        <input type='password' placeholder='Confirm Password' />
        <button type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}
