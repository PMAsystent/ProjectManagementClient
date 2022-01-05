import { combineReducers } from 'redux';
import { authReducer, authReducerInterface } from './auth/auth.slice';
import { projectReducer, projectReducerInterface } from './project/project.slice';
import { taskReducer, taskReducerInterface } from './task/task.slice';
import { projectAssignments, projectAssignmentsInterface } from './projectAssignments/projectAssignments.slice';
import { stepReducer, stepReducerInterface } from './step/step.slice';

export interface rootReducerInterface {
  auth: authReducerInterface;
  projects: projectReducerInterface;
  tasks: taskReducerInterface;
  projectAssignments: projectAssignmentsInterface;
  step: stepReducerInterface;
}

const rootReducer = combineReducers<rootReducerInterface>({
  auth: authReducer.reducer,
  projects: projectReducer.reducer,
  tasks: taskReducer.reducer,
  projectAssignments: projectAssignments.reducer,
  step: stepReducer.reducer,
});

export default rootReducer;
