import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';
import { projectReducer, projectReducerInterface } from './project/project.slice';
import { taskReducer, taskReducerInterface } from './task/task.slice';
import { projectAssignments, projectAssignmentsInterface } from './projectAssignments/projectAssignments.slice';
import { stepReducer, stepReducerInterface } from './step/step.slice';
import { sharedReducer, sharedReducerInterface } from './shared/shared.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
  project: projectReducerInterface;
  tasks: taskReducerInterface;
  projectAssignments: projectAssignmentsInterface;
  step: stepReducerInterface;
  shared: sharedReducerInterface;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
  project: projectReducer.reducer,
  tasks: taskReducer.reducer,
  projectAssignments: projectAssignments.reducer,
  step: stepReducer.reducer,
  shared: sharedReducer.reducer,
});

export default rootReducer;
