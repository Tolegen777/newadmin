import axios from "axios";

export const $api = axios.create({
    baseURL:'https://dev.adu24.com/'
})
$api.interceptors.request.use((config)=>{
    if(config.headers){
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    }
})
