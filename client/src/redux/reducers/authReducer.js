import {
  CLEAR_ERROR,
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
  success: null
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
        success: null,
        currentUser: action.payload.user.username,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        isAuthenticated: null,
        token: null,
      };
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: null,
        token: null,
        errMsg: action.payload,
        success: false
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        success: null,
        errMsg: ''
      }
    }
    default:
      return state;
  }
}
