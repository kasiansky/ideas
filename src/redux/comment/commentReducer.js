import {
  COMMENT_REQUEST_SUCCESS,
  COMMENT_REQUEST_FAILURE,
  COMMENT_REQUEST,
  DELETE_COMMENT,
  POST_COMMENT,
} from './commentTypes';

const initState = {
  loading: true,
  comments: [],
  error: '',
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case COMMENT_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_COMMENT:
      const comments = [...state.comments];
      comments.push(action.payload);
      return {
        ...state,
        comments,
      };
    case DELETE_COMMENT:
      let newComments = state.comments.filter(comment => {
        return action.payload.id !== comment.id;
      });
      return {
        ...state,
        comments: newComments,
      };
    default:
      return state;
  }
};
export default commentReducer;
