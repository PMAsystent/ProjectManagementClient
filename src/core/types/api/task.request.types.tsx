import { taskAssignmentsType } from './assigned.request.types';
import { projectSubtask } from './subtask.request.types';

export interface projectPostTaskType extends Omit<taskDetailsType, 'subTasks' | 'id'> {}

export interface projectPutTaskType extends Omit<taskDetailsType, 'subTasks'> {
  progressPercentage: number;
}
export interface taskDetailsType {
  id: number;
  name: string;
  priority: string;
  taskStatus: string;
  dueDate: string;
  stepId: number;
  assignedUser: Array<taskAssignmentsType>;
  subtasks: Array<projectSubtask>;
  description?: string;
}
