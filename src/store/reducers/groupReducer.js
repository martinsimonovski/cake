import { FETCH_CURRENT_GROUP, UPDATE_GROUP } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CURRENT_GROUP:
            return action.payload.data;
        case UPDATE_GROUP:
            return action.payload.data;
        default:
            return state;
    }
};