import axios from 'axios';

const apiService = axios.create({
    baseURL: 'https://localhost:7059/api', // Đặt URL cơ sở của API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiService;


