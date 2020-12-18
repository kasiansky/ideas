import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import ideaReducer from './idea/ideaReducer';
import commentReducer from './comment/commentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  idea: ideaReducer,
  comment: commentReducer,
});

export default rootReducer;
