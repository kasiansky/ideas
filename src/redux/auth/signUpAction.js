import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from './types';
import axios from 'axios';

export const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};
const signUpSuccess = user => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: user,
  };
};
const signUpFailure = error => {
  return {
    type: SIGN_UP_FAILURE,
    payload: error,
  };
};
export const signUp = user => {
  return dispatch => {
    dispatch(signUpRequest);
    axios
      .post('http://localhost:4000/register', user)
      .then(response => {
        const user = response.data;
        dispatch(signUpSuccess(user));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(signUpFailure(errorMsg));
      });
  };
};
