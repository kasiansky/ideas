import {
  GET_COMMENT,
  POST_COMMENT,
  DELETE_COMMENT,
  COMMENT_REQUEST,
  COMMENT_REQUEST_SUCCESS,
  COMMENT_REQUEST_FAILURE,
} from './commentTypes';
import axios from 'axios';

const token = localStorage.getItem('token');

export const commentRequest = () => {
  return {
    type: COMMENT_REQUEST,
  };
};
const commentRequestSuccess = data => {
  return {
    type: COMMENT_REQUEST_SUCCESS,
    payload: data,
  };
};
const commentRequestFailure = error => {
  return {
    type: COMMENT_REQUEST_FAILURE,
    payload: error,
  };
};
const addComment = data => {
  return {
    type: POST_COMMENT,
    payload: data,
  };
};
const commentDelete = data => {
  return {
    type: DELETE_COMMENT,
    payload: data,
  };
};

export const getComment = id => {
  const ideaId = id;
  return dispatch => {
    dispatch(commentRequest);
    return axios
      .get(`http://localhost:4000/api/comment/idea/${id}`)
      .then(response => {
        const data = {
          comments: response.data,
          ideaId: ideaId,
        };
        dispatch(commentRequestSuccess(data));
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(commentRequestFailure(errorMsg));
      });
  };
};
export const postComment = (comment, ideaId) => {
  return dispatch => {
    dispatch(commentRequest);
    return axios
      .post(`http://localhost:4000/api/comment/idea/${ideaId}`, comment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const data = response.data;
        dispatch(addComment(data));
        alert('Comment added successfully');
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(commentRequestFailure(errorMsg));
      });
  };
};
export const deleteComment = (commentId, ideaId) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    return axios
      .delete(`http://localhost:4000/api/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const data = {
          commentId,
          ideaId,
        };
        dispatch(commentDelete(data));
        alert('Comment deleted successfully');
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(commentRequestFailure(errorMsg));
      });
  };
};
