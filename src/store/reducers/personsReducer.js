import { FETCH_PERSONS, ADD_PERSON, PERSON_ERROR, DELETE_PERSON } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    errorMessage: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PERSONS:
            return {
                ...state,
                data: action.payload.data
            };
        case ADD_PERSON:
            return {
                ...state,
                data: action.payload.data
            };
        case PERSON_ERROR:
            return {
                ...state,
                errorMessage: action.payload.data.errorMessage
            };
        case DELETE_PERSON: {
            const persons = state.data.filter((person) => {
                return person._id !== action.payload.data.id
            });
            return {
                ...state,
                data: persons
            };
        }
        default:
            return state;
    }
};