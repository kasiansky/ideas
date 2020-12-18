import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  GET_USER_FROM_LS,
} from './types';

const initState = {
  // token: localStorage.getItem('token'),
  loading: true,
  currentUser: null,
  error: '',
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_FROM_LS:
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      return {
        ...state,
        currentUser,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        currentUser: null,
        error: action.payload,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        loading: false,
        currentUser: action.payload,
      };
    case SIGN_UP_FAILURE:
      return {
        loading: false,
        currentUser: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
