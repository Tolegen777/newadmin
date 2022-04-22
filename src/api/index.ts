import axios from "axios";
import {AuthService} from "../service/auth/auth.service";

export const $imageApi = 'https://adu24file.ams3.digitaloceanspaces.com';

export const DEV_API = 'https://dev.adu24.com/';
export const PROD_API = 'https://api.adu24.com/';
const env = process.env.NODE_ENV;

export const getEnvApi = (): string => {
    return PROD_API
    // if (env === 'development' || env === 'test') {
    //     return DEV_API;
    // } else if (env === 'production') {
    //     return PROD_API;
    // } else {
    //     return DEV_API;
    // }
}

export const $api = axios.create({
    baseURL: getEnvApi(),
    withCredentials: true,
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');

    if (config && config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('access_token', response.data.access_token)
            return $api.request(originalRequest)
        } catch (e) {
            console.log("Пользователь не авторизован")
        }
    }
    throw error
})

export default $api
