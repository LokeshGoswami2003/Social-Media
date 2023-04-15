import axios from "axios";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from "./localStorageManager";

let baseURL = "http://localhost:4000/";
console.log("env is ", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}

export const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers[`Authorization`] = `Bearer ${accessToken}`;
    return request;
});

axiosClient.interceptors.response.use(async (respone) => {
    const data = respone.data;
    if (data.status === "ok") {
        return data;
    }

    const originalRequest = respone.config;
    const statusCode = data.statusCode;
    const error = data.error;

    if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const response = await axios
            .create({
                baseURL,
                withCredentials: true,
            })
            .get(`http://localhost:4000/auth/refresh`);
        if (response.status === "ok") {
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            originalRequest.headers[
                `Authorization`
            ] = `Bearer ${response.result.accessToken}`;
            return axios(originalRequest);
        }
    } else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
    }

    return Promise.reject(error);
});
