import axios from 'axios';

const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_AUTH_URL,
    withCredentials: true
})

export interface userAuthProps {
    email: string;
    password: string;
}

export const loginUser = async (data: userAuthProps) => {
    return authApi.post('user/login', data)

}

export const registerUser = async (data: userAuthProps) => {
    return authApi.post('user/register', data)
}

export const checkAuth = async () => {
    return authApi.get('/user/auth')
}

export default authApi;