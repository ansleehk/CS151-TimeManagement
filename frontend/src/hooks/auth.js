import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';

const USER_ID_COOKIE_ID = "USER_ID";

function checkIsUserCookieExist() {
    return Cookies.get(USER_ID_COOKIE_ID);
}

export function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(checkIsUserCookieExist());

    useEffect(() => {
        setInterval(() => {
            const nowState = checkIsUserCookieExist()
            if (isLoggedIn !== nowState) setIsLoggedIn(nowState)

        }, 1000)
    })
    return isLoggedIn;
}