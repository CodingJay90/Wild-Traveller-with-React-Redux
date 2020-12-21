import {
  CLEAR_ERROR,
  DELETE_USER,
  USER_LOADING,
  GET_SPECIFIC_USER,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  UPDATE_USER,
  USER_LOADED,
  USER_LOADED_FAIL,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  errMsg: "",
  currentUser: null,
  success: null,
  specificUser: null,
  isLoading: false
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
        success: false,
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    }
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SPECIFIC_USER: {
      return {
        ...state,
        specificUser: action.payload,
        isLoading: false
      };
    }
    case DELETE_USER: {
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: null,
        isAuthenticated: null,
      };
    }
    case CLEAR_ERROR: {
      return {
        ...state,
        success: null,
        errMsg: "",
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
}
