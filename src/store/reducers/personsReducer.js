import { FETCH_PERSONS, ADD_PERSON, ADD_PERSON_ERROR } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PERSONS:
            return action.payload.data;
        case ADD_PERSON:
            return action.payload.data;
        case ADD_PERSON_ERROR:
            return action.payload.data;
        default:
            return state;
    }
};