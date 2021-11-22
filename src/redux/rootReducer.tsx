import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';
import { projectReducer } from './project/project.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
  projects: any;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
  projects: projectReducer.reducer,
});

export default rootReducer;
