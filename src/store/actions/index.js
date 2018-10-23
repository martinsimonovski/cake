import {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_PERSONS,
    FETCH_CURRENT_GROUP,
    UPDATE_GROUP,
    ADD_PERSON,
    ADD_PERSON_ERROR
} from './types';

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
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Wrong credentials' });
    }
};

export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};

export const fetchPersons = () => async (dispatch, getState, api) => {
    const res = await api.get('/persons');

    dispatch({
        type: FETCH_PERSONS,
        payload: res
    });
};

export const fetchCurrentGroup = () => async (dispatch, getState, api) => {
    const res = await api.get('/birthday/group/current');
    dispatch({
        type: FETCH_CURRENT_GROUP,
        payload: res
    })
}

export const updateGroup = ({ groupId, personId, payed }) => async (dispatch, getState, api) => {
    const res = await api.put(`/birthday/group/${groupId}`, {
        personId,
        payed
    });

    dispatch({
        type: UPDATE_GROUP,
        payload: res
    });
}

export const addPerson = (formProps, callback) => async (dispatch, getState, api) => {
    const res = await api.post(`/persons`, {
        firstName: formProps.firstName,
        lastName: formProps.lastName,
        birthday: formProps.birthday
    }).then((data) => {
        dispatch({
            type: ADD_PERSON,
            payload: data
        });
        callback();
    }).catch(error => {
        dispatch({
            type: ADD_PERSON_ERROR,
            payload: error.response
        });
    });
}