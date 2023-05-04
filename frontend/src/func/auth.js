import Cookies from 'js-cookie';

const USER_ID_COOKIE_KEY = "USER_ID";

export const getUserIdFromCookie = () => {
    return Cookies.get(USER_ID_COOKIE_KEY);
}

export const logout = () => {
    Cookies.remove(USER_ID_COOKIE_KEY);
    document.location.replace("/");
}