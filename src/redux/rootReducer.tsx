import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';
import { projectReducer, projectReducerInterface } from './project/project.slice';
import { taskReducer, taskReducerInterface } from './task/task.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
  projects: projectReducerInterface;
  tasks: taskReducerInterface;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
  projects: projectReducer.reducer,
  tasks: taskReducer.reducer,
});

export default rootReducer;
