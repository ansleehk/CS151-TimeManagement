import { useEffect } from 'react';
import './styles/register.scss';
import axios from 'axios';
import { TimeManagementError } from '../func/errorHandler';
import { useNavigate } from 'react-router-dom';
import { useIsLoggedIn } from '../hooks/auth';

export default function RegisterPage() {

  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {


      const PW = event.target["password"].value;
      const CONFIRM_PW = event.target["confirm-password"].value;

      if (PW !== CONFIRM_PW) {
        throw new TimeManagementError("Passwords do not match")
      }

      const HTTP_RES = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
        "firstName": event.target["firstName"].value,
        "lastName": event.target["lastName"].value,
        "username": event.target["username"].value,
        "birthday": event.target["birthday"].value,
        "password": CONFIRM_PW
      }, { withCredentials: true })

      if (HTTP_RES.status === 200){
        document.location.replace("/")
      } else {
        throw new Error("Weird HTTP Res when register for an account")
      }


    } catch (error) {
      if (error instanceof TimeManagementError) {
        error.displayErrorBox();
      } else {
        throw error;
      }
    }

  }

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [useIsLoggedIn])

  return (
    <div id='registration'>
      <div id="header">
        <h1>Register</h1>
        <p id='subtitle'>Register an Account To Have Us Manage Your Time!</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div id='name-container'>
          <input type='text' name='firstName' placeholder='First Name' />
          <input type='text' name="lastName" placeholder='Last Name' />
        </div>
        <input type='text' name="username" placeholder='Enter Username' />
        <input type="date" name='birthday' placeholder='Birthday' />
        <input type='password' name="password" placeholder='Enter Password' />
        <input type='password' name="confirm-password" placeholder='Confirm Password' />
        <button type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}
