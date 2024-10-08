import axios from 'axios';

const BASE_URL = 'http://localhost:3090';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: false,  
    headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
