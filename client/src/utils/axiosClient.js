import axios from "axios";
import {
    KEY_ACCESS_TOKEN,
    getItem,
    removeItem,
    setItem,
} from "./localStorageManager";

let baseURL = "http://localhost:4000";
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

    if (
        statusCode === 401 &&
        originalRequest.url === "http://localhost:4000/auth/refresh"
    ) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
    }

    if (statusCode === 401) {
        const response = await axiosClient.get("/auth/refresh");
        if (response.status === "ok") {
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            originalRequest.headers[
                `Authorization`
            ] = `Bearer ${response.result.accessToken}`;
            return axios(originalRequest);
        }
    }

    return Promise.reject(error);
});
