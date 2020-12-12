import {
  LOGIN_USER,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  USER_LOADED,
  USER_LOADED_FAIL,
} from "./actionTypes";

export const registerUser = (user) => (dispatch) => {
  fetch("http://localhost:5000/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.success === false) {
        dispatch({
          type: REGISTER_USER,
          payload: data,
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAIL,
          payload: data,
        });
      }
    });
};

export const loginUser = (user) => (dispatch) => {
  fetch("http://localhost:5000/auth/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "Application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data.success === false) {
        dispatch({
          type: LOGIN_USER,
          payload: data,
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAIL,
          payload: data,
        });
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    });
};

export const loadUser = () => (dispatch, getState) => {
  fetch("http://localhost:5000/auth/user", {
    headers: {
      Authorization: getState().auth.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: USER_LOADED_FAIL,
        payload: err.message,
      });
    });
};
