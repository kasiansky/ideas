import {
  IDEA_REQUEST_SUCCESS,
  IDEA_REQUEST_FAILURE,
  IDEA_REQUEST,
  IDEA_DELETE_REQUEST,
  EDIT_IDEA_REQUEST,
  CREATE_IDEA_REQUEST,
  STORE_CURRENT_IDEA,
} from './ideaActionTypes';
import axios from 'axios';

export const ideaRequest = () => {
  return {
    type: IDEA_REQUEST,
  };
};
const ideaRequestSuccess = data => {
  return {
    type: IDEA_REQUEST_SUCCESS,
    payload: data,
  };
};
const ideaRequestFailure = error => {
  return {
    type: IDEA_REQUEST_FAILURE,
    payload: error,
  };
};
const ideaDeleteRequest = data => {
  return {
    type: IDEA_DELETE_REQUEST,
    payload: data,
  };
};
const editIdeaRequest = data => {
  return {
    type: EDIT_IDEA_REQUEST,
    payload: data,
  };
};
const createIdeaRequest = data => {
  return {
    type: CREATE_IDEA_REQUEST,
    payload: data,
  };
};
export const storeIdea = data => {
  return {
    type: STORE_CURRENT_IDEA,
    payload: data,
  };
};

export const createIdea = (idea, token) => {
  return dispatch => {
    dispatch(ideaRequest);
    return axios
      .post('http://localhost:4000/api/idea', idea, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const data = response.data;
        dispatch(createIdeaRequest(data));
        alert('Idea created!');
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(ideaRequestFailure(errorMsg));
      });
  };
};
export const deleteIdea = (id, token) => {
  return dispatch => {
    dispatch(ideaRequest);
    return axios
      .delete(`http://localhost:4000/api/idea/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const data = response.data;
        dispatch(ideaDeleteRequest(data));
        alert('idea deleted');
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(ideaRequestFailure(errorMsg));
      });
  };
};
export const editIdea = (id, idea, token) => {
  return dispatch => {
    dispatch(ideaRequest);
    return axios
      .put(`http://localhost:4000/api/idea/${id}`, idea, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const data = response.data;

        dispatch(editIdeaRequest(data));
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(ideaRequestFailure(errorMsg));
      });
  };
};
export const getAllIdeas = () => {
  return dispatch => {
    dispatch(ideaRequest);

    return axios

      .get('http://localhost:4000/api/idea')
      .then(response => {
        const data = response.data.items; //Graphql??
        console.log('data', data);
        dispatch(ideaRequestSuccess(data));
      })
      .catch(error => {
        const errorMsg = error.message;
        alert(errorMsg);
        dispatch(ideaRequestFailure(errorMsg));
      });
  };
};
