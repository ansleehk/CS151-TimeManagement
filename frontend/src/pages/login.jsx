import React, { useState } from 'react'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import '../styles/loginForm.css';
import timePicture from '../components/img/timePicture.png'

//loginForm function, takes in login and error props from loginPage.js
export function LoginPage({ Login, error }) {
	//details useState gets returned to Login const in loginPage.js for event listener if-else comparison
	const [details, setDetails] = useState({ username: "", password: "" });

	//event handler const declaration
	const submitHandler = e => {
		e.preventDefault();
		Login(details);
	}
	// this is what we see on the front page
	return (
		<form onSubmit={submitHandler}>
			<div className='loginPage'>

				{/* Form rendering, onChange to listen for user events(inputs), setDetails is updated for details to be updated into condition in loginPage.js*/}
				<div className="form-inner">
						<MDBRow className='d-flex flex-row justify-content-between'>
							
							<MDBCol col='6'>
								<MDBCard className='loginCard my-5 mx-lg-5' style={{ borderRadius: '1rem', maxWidth: '500px', }}>
									<MDBCardBody className='p-5 d-flex flex-column align-items-center w-100'>
										<h2 className="fw-bold text-uppercase">Time Management</h2>
										<p className="loginText">Time Management is the key to success</p>
										
										<div className='d-flex flex-row justify-content-center'>
											<form>
												<div classname="form-group">
													<input type="email" name="email" id="username" placeholder="Email" required onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
												</div>
												<p className="small mb-3"></p>
												<div classname="form-group">
													<input type="password" name="password" id="password" placeholder="Password" required onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
												</div>
												<p className="small mb-3"></p>

											</form>
										</div>
										<p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
										<input className='loginButt' type="submit" value="Login" />
										{(error !== "") ? (<div className="error" style={{ color: '#c7423a' }}>{error}</div>) : ""}
										<div className='d-flex flex-row mt-3 mb-5'>
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
										<div className='loginFooter'>
											<p className="mb-0">Don't have an account? <a href="./register" class="text-white-50 fw-bold">Sign Up</a></p>
										</div>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>

							<MDBCol col = '6' className='my-5 mx-lg-5'  style={{ maxWidth: '580px', }}>
								<div classname="timePicture">
									<img src={timePicture} width="200px" height="auto" ></img>
								</div>
							</MDBCol>

						</MDBRow>
				</div>
			</div>
		</form>
	)
}
