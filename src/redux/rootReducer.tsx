import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';
import { projectReducer, projectReducerInterface } from './project/project.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
  projects: projectReducerInterface;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
  projects: projectReducer.reducer,
});

export default rootReducer;
