import React, { useState } from 'react'
import "./styles/login.css"

import timePicture from './img/timePicture.png';

export default function Login() {
    return (
      
      
      <container >

      <ul class='loginstack'>
  
        <div id="RegisterPage" className='page-container right-page-container form-container'>
          <h1 class="LoginTitle">Login</h1>
  
          <p class="subtitle">
                  Login To Your Account!
              </p>
          <form >
  
          <container class="Info" >
  
            <div>
              <input type="email" placeholder='Enter Email' class='emailinput h'/>
            </div>
  
            <div>
              <input type="password" placeholder='Enter Password' class='passwordinput h' />
            </div>

  
            <button class="loginbutton" type='submit'>Login</button>
  
          </container>
  
  
          </form>
  
  
          </div>
          
  
        </ul>
        </container>
      );
}
