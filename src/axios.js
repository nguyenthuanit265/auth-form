import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export default axiosInstance;