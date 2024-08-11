import axios, { AxiosInstance } from 'axios';
import { env } from 'vite';

const baseURL = env.VITE_API_BASE_URL;
const api: AxiosInstance = axios.create({
    baseURL,
});

export default api;