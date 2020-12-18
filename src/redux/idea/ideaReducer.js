import {
  IDEA_REQUEST_SUCCESS,
  IDEA_REQUEST_FAILURE,
  IDEA_REQUEST,
  IDEA_DELETE_REQUEST,
  EDIT_IDEA_REQUEST,
  CREATE_IDEA_REQUEST,
  STORE_CURRENT_IDEA,
} from './ideaActionTypes';
import { DELETE_COMMENT } from '../comment/commentTypes';

const initState = {
  loading: true,
  ideas: [],
  currentIdea: null,
  error: '',
  canRedirect: false,
};

const ideaReducer = (state = initState, action) => {
  switch (action.type) {
    case IDEA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IDEA_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        ideas: action.payload,
      };
    case IDEA_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        // ideas: [],
        error: action.payload,
      };
    case IDEA_DELETE_REQUEST:
      let newIdeas = state.ideas.filter(idea => {
        return action.payload.id !== idea.id;
      });
      return {
        ...state,
        ideas: newIdeas,
      };
    case EDIT_IDEA_REQUEST:
      let index = state.ideas.findIndex(idea => idea.id === action.payload.id);
      const ideas = [...state.ideas];
      ideas.splice(index, 1, { ...action.payload });
      return {
        ...state,
        ideas: ideas,
      };
    case CREATE_IDEA_REQUEST:
      const ideas1 = [...state.ideas];
      ideas1.push(action.payload);
      return {
        ...state,
        ideas: ideas1,
        canRedirect: true,
      };
    case STORE_CURRENT_IDEA:
      return {
        ...state,
        currentIdea: action.payload,
      };
    case DELETE_COMMENT:
      console.log(action.payload);
      const { commentId, ideaId } = action.payload;

      return state;
    // return {

    // }
    default:
      return state;
  }
};
export default ideaReducer;
