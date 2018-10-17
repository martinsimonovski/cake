import { AUTH_USER, AUTH_ERROR } from './types';

export const login = (formProps, callback) => async (dispatch) => {
    try {
        const response = {
            data: {
                token: 'asdhuadqwnd'
            }
        };

        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();        
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Wrong credentials'});
    }
};

export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};