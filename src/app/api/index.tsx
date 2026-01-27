import axios from 'axios';

export const mainApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
    withCredentials: true
})