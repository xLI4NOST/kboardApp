import axios from 'axios';
import {mainApi} from "@/app/api/index";

export interface userAuthProps {
    email: string;
    password: string;
}

export const loginUser = async (data: userAuthProps) => {
    return mainApi.post('user/login', data)

}

export const registerUser = async (data: userAuthProps) => {
    return mainApi.post('user/register', data)
}

export const checkAuth = async () => {
    return mainApi.get('/user/auth')
}

export const logoutUser = async () => {
    return mainApi.post('/user/logOut')
}

export default mainApi;