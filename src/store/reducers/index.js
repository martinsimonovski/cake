import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import personsReducer from './personsReducer';
import groupReducer from './groupReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    persons: personsReducer,
    group: groupReducer
});