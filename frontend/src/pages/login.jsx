import React, { useState } from 'react'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import '../styles/loginForm.css';
import timePicture from '../components/img/timePicture.png';

//loginForm function, takes in login and error props from loginPage.js
export function LoginPage() {
    return (
		<div className='registerPage'>

        <div className="form-inner">
            <MDBRow className='d-flex justify-content-center align-items-center h-50'>
              <MDBCol col='6'>

                <MDBCard className='registerCard my-5 mx-lg-5' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center w-100'>

                    <h2 className="fw-bold mb-2 text-uppercase">Create an Account</h2>
                    <center><p className="mb-10">Time Management is the key to success</p></center>

                    <div className='d-flex flex-row justify-content-center'>
                      <form>
                        <div classname="form-group">
                          <input type="Email" name="email" id="email" placeholder="Email" />
                          <p className="small mb-3"></p>
                        </div>
                        <div classname="form-group">
                          <input type="password" name="password" id="password" placeholder="Password" />
                          <p className="small mb-3"></p>
                        </div>
                        <div classname="form-group">
						  <div className='loginFooter'>
											<p className="mb-0">Don't have an account? <a href="./register" class="text-white-50 fw-bold">Sign Up</a></p>
										</div>
                        </div>
                      </form>
                    </div>

                    <button className="submitB" type='submit'>Create Account</button>
                    <div className='d-flex flex-row mt-3'>
                      <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='facebook-f' size="lg" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='twitter' size="lg" />
                      </MDBBtn>

                      <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='google' size="lg" />
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol col='6' className='my-5 mx-lg-5' style={{ maxWidth: '580px', }}>
                <div className="timePicture">
                  <img src={timePicture} width="200px" height="auto"></img>
                </div>
              </MDBCol>
            </MDBRow>
        </div>
      </div>
    );
  }
