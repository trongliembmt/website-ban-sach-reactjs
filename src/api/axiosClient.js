import axios from "axios";
import queryString, { stringify } from 'query-string';
import UserService from "../service/UserService";




const axiosClient = axios.create({
    baseURL: "",
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (req) => {
    const userservice = new UserService()

    if(!req.url.includes("/api/login")  && !req.url.includes("/api/register") && !req.url.includes("/api/selling") && !req.url.includes("/api/book")){
        const token = userservice.getToken()
        req.headers.common.Authorization = "Bearer " + token;
        return req;
    }
    
    return req;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => { throw error; });

export default axiosClient;