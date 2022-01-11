import { taskAssignmentsType } from './assigned.request.types';

export interface taskDetailsType {
  id: number;
  name: string;
  priority: string;
  taskStatus: string;
  dueDate: string;
  stepId: number;
  assignedUser: Array<taskAssignmentsType>;
  subTasks: Array<any>; // todo
  description?: string;
}

export interface projectPostTaskType extends Omit<taskDetailsType, 'subTasks' | 'id'> {}

export interface projectPutTaskType extends Omit<taskDetailsType, 'subTasks'> {
  progressPercentage: number;
}
