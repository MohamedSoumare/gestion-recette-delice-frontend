import axios from 'axios';

const BASE_URL = 'http://localhost:3090';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,  
    headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
