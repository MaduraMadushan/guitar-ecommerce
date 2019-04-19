import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOOUT_USER} from './type';
import {USER_SERVER} from './../utils/misc';

export const loginUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const registerUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

return {
    type: REGISTER_USER,
    payload: request
}
}

export const auth = () => {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

        return {
            type: AUTH_USER,
            payload: request
        }
}

export const logoutUser = () => {
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOOUT_USER,
        payload: request
    }
}