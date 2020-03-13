import axios from "axios";
import { env } from "@/config/constants";

let config = {
    baseURL: env[process.env.NODE_ENV] || env.development
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default _axios;
