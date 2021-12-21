import { projectAssignmentsType } from './assigned.request.types';
import { projectStep } from './step.request.types';
import { projectPutTaskType } from './task.request.types';

export interface projectType {
  id: number;
  name: string;
  dueDate: string;
  isActive: boolean;
  progressPercentage: number;
  steps: Array<projectStep>;
}

export interface myProjectsType {
  projectsList: Array<projectType>;
  count: number;
}

export interface postProjectType {
  name: string;
  description: string;
  dueDate: string;
  assignedUsers: Array<Omit<projectAssignmentsType, 'userName'>>;
}

export interface putProjectType extends Omit<postProjectType, 'assignedUsers'> {
  id: number;
}

export interface projectDetails extends Omit<projectType, 'isActive'> {
  description: string;
  created: string;
  projectSteps: Array<projectStep>;
  projectTasks: Array<projectPutTaskType>;
  projectAssignedUsers: Array<projectAssignmentsType>;
  currentUserInfoInProject: {
    memberType: string;
    projectRole: string;
  };
}
