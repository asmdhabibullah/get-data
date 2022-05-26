import { API } from '../config/index';
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from 'next/router';

export const setCookie = (key: string, value: any) => {
    if (process.browser) {
        Cookie.set(key, value, {
            path: "/",
            // secure: true,
            // HttpOnly: true,
            // sameSite: 'strict',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    }
};
// get cookie
export const getCookie = (key: string) => {
    if (process.browser) {
        return Cookie.get(key);
    }
};
export const removeCookie = (key: string) => {
    if (process.browser) {
        Cookie.remove(key, {
            expires: 1,
        });
    }
};

// Set localstorage
export const setLocalStorage = (key: string, value: {}) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
// Get localstorage
export const getLocalStorage = (key: string) => {
    if (process.browser) {
        return JSON.parse(localStorage.getItem(key)!);
    }
};
// Remove localstorage
export const removeLocalStorage = (key: string) => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};

// Current user
export const authenticUser = (key: string) => {
    return getLocalStorage(key);
};

export const redirects = (path: string) => {
    if (process?.browser) {
        return location.replace(path);
    }
};

// Get Data from server
export const ApiGetHelper = async (endpoint: string) => {
    const cookie = getCookie("token");
    // console.log("Cookies", cookie);

    return await axios
        .get(endpoint, {
            headers: {
                "Authorization": cookie,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res)
        .catch((err) => {
            // console.log(err.response.data.message);
            if (err?.response?.data?.message) {
                return err.response.data.message;
            }
            return err;
        });
};
// Post Data to server
export const ApiPostHelper = async (endpoint: string, data: any) => {
    // console.log(data);
    const cookie = getCookie("token");
    return await axios
        .post(endpoint, data, {
            headers: {
                "Authorization": cookie,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res)
        .catch((err) => err);
};
// Updata existing Data to server
export const ApiPutHelper = async (endpoint: string, data: any) => {
    const cookie = getCookie("token");
    return await axios
        .put(endpoint, data, {
            headers: {
                "Authorization": cookie,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res)
        .catch((err) => err);
};
// Delete existing Data to server
export const ApiDeleteHelper = async (endpoint: string) => {
    const cookie = getCookie("token");
    return await axios
        .delete(endpoint, {
            headers: {
                "Authorization": cookie,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res)
        .catch((err) => err);
};


// Frontend logout method
export const logout = async () => {
    // const router = useRouter();
    removeCookie("token");
    removeLocalStorage("user");
    // router.push("/");
    // router.reload();
    // return await axios(`${API}/auth/user/signout`)
    //     .then((res) => res)
    //     .catch((err) => err);
};