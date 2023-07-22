// project imports
import { api } from './api';
import * as userReducer from "reducers/userReducer";

/**
 * Sign in
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<function>}
 */
export const signin = (name, password) => async dispatch => {
    try {
        await api.signin(name, password);
        localStorage.setItem('accessToken', api.token);
        dispatch(userReducer.signin());
    } catch (err) {
        throw err;
    }
}

export const checkAccess = () => {
    return async dispatch => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            api.init(token);
            dispatch(userReducer.signin());
        }
    }
}

export const signout = () => dispatch => {
    localStorage.removeItem('accessToken');
    api.init();
    dispatch(userReducer.signout());
}
