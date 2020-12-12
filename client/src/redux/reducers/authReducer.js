import {
  LOGIN_USER,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  USER_LOADED,
  USER_LOADED_FAIL,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  errMsg: "",
  currentUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        errMsg: "",
        currentUser: action.payload.user.username,
      };
    case LOGIN_USER_FAIL:
    case USER_LOADED_FAIL:
    case REGISTER_USER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        errMsg: action.payload,
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
}
