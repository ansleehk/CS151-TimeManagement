import { useEffect } from 'react';
import './styles/login.scss';
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';
import { useIsLoggedIn } from '../hooks/auth';
import { TimeManagementError } from '../func/errorHandler';

export default function Login() {

  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const USERNAME = event.target.username.value;
    const PASSWORD = event.target.password.value;

    try {
      const HTTP_RES = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        "username": USERNAME,
        "password": PASSWORD
      }, { withCredentials: true })

      if (HTTP_RES.status === 200){
        document.location.replace("/");
      } else {
        throw new Error("Weird HTTP Res when login")
      }
    

    } catch (error) {
      try {
        if (error instanceof AxiosError) {
          if (error.response.status === 401) {
            throw new TimeManagementError("Wrong Login Credential")
          } else {
            throw error;
          }
        } 


       } catch (e) {
          if (e instanceof TimeManagementError){
            e.displayErrorBox()
          } else {
            throw e;
          }
       }
    }

  }

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [useIsLoggedIn])

  return (
    <div id="login-container">
      <div id="info">
        <h1 id="title">Login</h1>
        <p id="subtitle">Login To Your Account!</p>

      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}


