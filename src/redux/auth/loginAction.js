import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_USER_FROM_LS,
} from './types';
import axios from 'axios';

export const getUserFromLS = () => {
  return {
    type: GET_USER_FROM_LS,
  };
};

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};
const loginUserSuccess = data => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};
const loginUserFailure = error => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};
export const loginUser = currentUser => {
  return dispatch => {
    dispatch(loginUserRequest);
    return axios
      .post('http://localhost:4000/login', currentUser)
      .then(response => {
        const user = response.data;
        dispatch(loginUserSuccess(user));
        localStorage.setItem('token', user.token);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(loginUserFailure(errorMsg));
      });
  };
};
