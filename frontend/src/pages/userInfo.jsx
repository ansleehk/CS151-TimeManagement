import axios from "axios";
import { getUserIdFromCookie } from "../func/auth";
import "./styles/userInfo.scss"
import { useEffect, useState } from "react";

export default function UserInfoPage(){

    const [profile, setProfile] = useState({
        "birthday": "2023-05-04",
        "firstName": "",
        "lastName": "",
        "username": ""
    });

    const fetchUserInfo = async() => {
        const HTTP_RES = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/${getUserIdFromCookie()}/info`)).data;
        setProfile(HTTP_RES)
    }

    useEffect(()=>{
        fetchUserInfo()
    }, [])

    return (
        <div id="user-info-page">
            <h1>Profile Setting</h1>
            <p>
                First Name: {profile["firstName"]}
            </p>
            <p>
                Last Name: {profile["lastName"]}
            </p>
            <p>
                Username: {profile["username"]}
            </p>
            <p>
                Birthday: {profile["birthday"]}
            </p>
        </div>
    )
}