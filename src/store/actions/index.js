import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_PERSONS,
  FETCH_CURRENT_GROUP,
  FETCH_GROUPS,
  CREATE_GROUP,
  UPDATE_GROUP,
  ADD_PERSON,
  PERSON_ERROR,
  DELETE_PERSON
} from "./types";

export const login = ({ username, password }, callback) => async (
  dispatch,
  getStore,
  api
) => {
  try {
    const response = await api.post("/auth/signin", {
      username,
      password
    });

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Wrong credentials" });
  }
};

export const logout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: ""
  };
};

export const fetchPersons = () => async (dispatch, getState, api) => {
  await api.get("/persons").then(response => {
    dispatch({
      type: FETCH_PERSONS,
      payload: response
    });
  });
};

export const fetchCurrentGroup = () => async (dispatch, getState, api) => {
  const res = await api.get("/birthday/group/current");
  dispatch({
    type: FETCH_CURRENT_GROUP,
    payload: res
  });
};

export const fetchGroups = () => async (dispatch, getState, api) => {
  await api.get("/birthday/groups").then(
    result => {
      dispatch({
        type: FETCH_GROUPS,
        payload: result
      });
    },
    error => {}
  );
};

export const createGroup = callback => async (dispatch, getState, api) => {
  await api.post("/birthday/group").then(
    response => {
      dispatch({
        type: CREATE_GROUP,
        payload: response
      });
    },
    error => {}
  );

  callback();
};

export const createCustomGroup = (formProps, callback) => async (
  dispatch,
  getState,
  api
) => {
  await api
    .post("/birthday/group", {
      month: formProps.month,
      active: formProps.active
    })
    .then(
      response => {
        dispatch({
          type: CREATE_GROUP,
          payload: response
        });
        callback();
      },
      error => {}
    );
};

export const updateGroup = ({ groupId, personId, payed }) => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.put(`/birthday/group/${groupId}`, {
    personId,
    payed
  });

  dispatch({
    type: UPDATE_GROUP,
    payload: res
  });
};

export const addPerson = (formProps, callback) => async (
  dispatch,
  getState,
  api
) => {
  await api
    .post(`/persons`, {
      firstName: formProps.firstName,
      lastName: formProps.lastName,
      birthday: formProps.birthday
    })
    .then(
      data => {
        dispatch({
          type: ADD_PERSON,
          payload: data
        });
        callback();
      },
      error => {
        dispatch({
          type: PERSON_ERROR,
          payload: error.response
        });
      }
    );
};

export const deletePerson = (id, callback) => async (
  dispatch,
  getState,
  api
) => {
  await api.delete(`/persons/${id}`).then(
    data => {
      dispatch({
        type: DELETE_PERSON,
        payload: data
      });
      callback();
    },
    error => {
      dispatch({
        type: PERSON_ERROR,
        payload: error.response
      });
      callback();
    }
  );
};
