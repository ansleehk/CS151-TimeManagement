import React, { useState } from 'react'
import './styles/register.css';

export default function RegisterPage() {
    return (
    <container >

    
    <ul class='registerstack'>

      <div id="RegisterPage" className='page-container right-page-container form-container'>
        <h1 class="RegisterTitle">Register</h1>

        <p id="subtitle">
                Register an Account To Have Us Manage Your Time!
            </p>
        <form >


        <container class="NameContainer" >


          <div class="firstname" >
            <input type="text" placeholder ='Enter First Name' class='name h' />
          </div>

          <div class="lastname" >
            <input type="text" placeholder ='Enter Last Name' class='name h'/>
          </div>
          
        </container>


        <container class="Info" >

        
          <div>
            <input type="email" placeholder='Enter Email' class='emailinput h'/>
          </div>

          <div>
            <input type="password" placeholder='Enter Password' class='passwordinput h' />
          </div>

          <div>
            <input type="password" placeholder='Confirm Password' class='confirmpasswordinput h' />
          </div>

          <button class="registerbutton" type='submit'>Register</button>

        </container>


        </form>


        </div>

      </ul>
      </container>
    );
  }
  
