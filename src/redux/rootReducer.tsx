import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';
import { projectReducer, projectReducerInterface } from './project/project.slice';
import { taskReducer, taskReducerInterface } from './task/task.slice';
import { projectAssignments, projectAssignmentsInterface } from './projectAssignments/projectAssignments.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
  projects: projectReducerInterface;
  tasks: taskReducerInterface;
  projectAssignments: projectAssignmentsInterface;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
  projects: projectReducer.reducer,
  tasks: taskReducer.reducer,
  projectAssignments: projectAssignments.reducer,
});

export default rootReducer;
