import { SET_ACTIVE_GROUP } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_GROUP:
      return action.payload.data;
    default:
      return state;
  }
};
