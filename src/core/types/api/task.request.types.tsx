import { taskAssignmentsType } from './assigned.request.types';

export interface projectPostTaskType extends Omit<taskType, 'subTasks' | 'id'> {}

export interface projectPutTaskType extends Omit<taskType, 'subTasks'> {
  progressPercentage: number;
}
export interface taskType {
  id: number;
  name: string;
  priority: string;
  taskStatus: string;
  dueDate: string;
  stepId: number;
  assignedUsers: Array<taskAssignmentsType>;
  subTasks: Array<any>; // todo
  description?: string;
}
