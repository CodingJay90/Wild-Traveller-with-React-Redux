import {
  LOGIN_USER,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  USER_LOADED,
  USER_LOADED_FAIL,
  CLEAR_ERROR, UPDATE_USER, DELETE_USER, GET_SPECIFIC_USER, FETCH_LOADING
} from "./actionTypes";

export const registerUser = (user) => (dispatch) => {
  fetch("/auth/register", {
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
  fetch("/auth/login", {
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
  fetch("/auth/user", {
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

export const getSpecificUser = (id) => (dispatch, getState) => {
  dispatch({type: FETCH_LOADING})
  fetch(`/auth/user/${id}`, {
    headers: {
      "Authorization": getState().auth.token
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    dispatch({
      type: GET_SPECIFIC_USER,
      payload: data.foundUser
    })
  })
}

export const clearError = () => dispatch => {
  dispatch({
    type: CLEAR_ERROR
  })
}

export const updateUser = (data) => (dispatch, getState) => {
  fetch("/auth/update", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      "Authorization": getState().auth.token,
      "Content-type": "Application/json",
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.success)
    console.log(data.updatedUser)
    dispatch({
      type: UPDATE_USER,
      payload: data.updatedUser
    })
  })
}

export const deleteUser = () => (dispatch, getState) => {
  fetch("/auth/delete", {
    method: 'DELETE',
    headers: {
      "Authorization": getState().auth.token
    }
  })
  .then(dispatch({
    type: DELETE_USER
  }))
}

