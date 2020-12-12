import {
  DELETE_LOCATION,
  FETCH_LOADING,
  FETCH_LOCATION,
  FETCH_SPECIFIC_LOCATION,
  ADD_LOCATION,
  UPDATE_LOCATION,
  ADD_COMMENT,
  LOCATION_ERROR, 
  SORT_LOCATION_BY_NAME,
  SORT_LOCATION_BY_DATE_CREATED, DELETE_COMMENT, FETCH_SPECIFIC_COMMENT, UPDATE_COMMENT
} from "./actionTypes";
const baseUrl = "http://localhost:5000/location";

export const getLocations = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  console.log(getState());
  fetch(baseUrl, {
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_LOCATION,
        payload: data,
      });
      console.log(data);
    });
};

export const getSpecificLocations = (id) => (dispatch, getState) => {
  // dispatch(setItemsLoading());
  // console.log(getState());
fetch(`${baseUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: FETCH_SPECIFIC_LOCATION,
        payload: data,
      });
      console.log(data);
    });
};

export const addLocation = (newData) => (dispatch, getState) => {
  fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-type": "application/json",
      Authorization: getState().auth.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        dispatch({
          type: LOCATION_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: ADD_LOCATION,
          payload: data,
        });
      }
    });
};

export const updateLocation = (id, newData) => (dispatch, getState) => {
  fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
    headers: {
      "Content-type": "Application/json",
      Authorization: getState().auth.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        dispatch({
          type: LOCATION_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: UPDATE_LOCATION,
          payload: data,
        });
      }
    })
    .catch((err) => console.log(err));
};

export const deleteLocation = (id) => (dispatch, getState) => {
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: getState().auth.token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(id);
      console.log(data);
      if (data.error) {
        dispatch({
          type: LOCATION_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: DELETE_LOCATION,
          payload: id,
        });
      }
    });
};

export const sortLocation = () => dispatch => {
  dispatch({
    type: SORT_LOCATION_BY_NAME
  })
}

export const sortLocationByDateCreated = () => dispatch => {
  dispatch({
    type: SORT_LOCATION_BY_DATE_CREATED
  })
}


//=================================
//COMMENT ACTIONS
//=================================

export const createComment = (id, text) => (dispatch, getState) => {
  const myBody = {
    text
  }
  console.log(text)
  fetch(`${baseUrl}/${id}/comment/create`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: getState().auth.token,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Methods",
      Origin: "http://localhost:5000",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.comment);
      console.log(data.user)
      console.log(data)
      dispatch({
        type: ADD_COMMENT,
        payload: data.comment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteComment = (id, commentId) => dispatch => {
  fetch(`${baseUrl}/${id}/comment/${commentId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(id);
      console.log(data);
      if (data.error) {
        console.log(data.error)
      } else {
        dispatch({
          type: DELETE_COMMENT,
          payload: id,
        });
      }
    });
}

export const getSpecificComment = (id, commentId) => dispatch => {
  fetch(`${baseUrl}/${id}/comment/${commentId}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    dispatch({
      type: FETCH_SPECIFIC_COMMENT,
      payload: data.foundComment
    })
  })
}

export const updateComment = (id, commentId, text) => dispatch => {
  fetch(`${baseUrl}/${id}/comment/${commentId}`, {
    method: 'PUT',
    body: JSON.stringify({text}),
    headers: {
      "Content-type": "Application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    dispatch({
      type: UPDATE_COMMENT,
      payload: data
    })
  })
}

export const setItemsLoading = () => {
  return {
    type: FETCH_LOADING,
  };
};
