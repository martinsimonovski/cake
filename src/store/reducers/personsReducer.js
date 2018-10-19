import { FETCH_PERSONS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PERSONS:
            return action.payload.data;
        default:
            return state;
    }
};