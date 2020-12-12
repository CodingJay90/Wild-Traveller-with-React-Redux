import {
  ADD_COMMENT,
  ADD_LOCATION,
  DELETE_COMMENT,
  DELETE_LOCATION,
  FETCH_LOADING,
  FETCH_LOCATION,
  FETCH_SPECIFIC_COMMENT,
  FETCH_SPECIFIC_LOCATION,
  LOCATION_ERROR,
  SORT_LOCATION_BY_DATE_CREATED,
  SORT_LOCATION_BY_NAME,
  UPDATE_COMMENT,
  UPDATE_LOCATION,
} from "../actions/actionTypes";

const initialState = {
  location: [],
  isLoading: false,
  error: null,
  specificLocation: [],
  specificComment: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SORT_LOCATION_BY_NAME:
      return {
        ...state,
        location: state.location.sort((a, b) => {
          if (a.location.toLowerCase() < b.location.toLowerCase()) return -1;
          if (a.location.toLowerCase() > b.location.toLowerCase()) return 1;
          return 0;
        }),
      };
    case SORT_LOCATION_BY_DATE_CREATED:
      return {
        ...state,
        location: state.location.sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        }),
      };
    case FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_LOCATION:
      return {
        ...state,
        location: action.payload,
        isLoading: false,
      };
    case FETCH_SPECIFIC_LOCATION:
      return {
        ...state,
        specificLocation: action.payload,
      };
    case ADD_LOCATION: {
      return {
        ...state,
        location: [...state.location, action.payload],
      };
    }
    case UPDATE_LOCATION: {
      return {
        ...state,
        location: state.location.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    }
    case DELETE_LOCATION:
      return {
        ...state,
        location: state.location.filter((item) => item._id !== action.payload),
      };
    case LOCATION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    //=====================
    //COMMENT REDUCERS
    //=====================
    case ADD_COMMENT:
      state.location.map((i) => console.log(i.comment));
      return {
        ...state,
        // location: [...state.location, state.location.comment.push(action.payload)],
        location: [
          ...state.location,
          state.location.map((item) => item.comment.push(action.payload)),
        ],
      };
    case FETCH_SPECIFIC_COMMENT:
      return {
        ...state,
        specificComment: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        location: [
          ...state.location,
          state.location.map((item) =>
            item.comment.filter((item) => item._id !== action.payload)
          ),
        ],
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        location: [
          ...state.location,
          state.location.map((item) =>
            item.comment.map((i) =>
              i._id !== action.payload._id ? action.payload : item
            )
          ),
        ],
      };
    default:
      return state;
  }
}
