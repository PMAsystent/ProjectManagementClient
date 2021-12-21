export interface projectPostTaskType {
  name: string;
  description?: string;
  priority: string;
  taskStatus: string;
  dueDate: string;
  stepId: number;
}

export interface projectPutTaskType {
  id: number;
  name: string;
  priority: string;
  taskStatus: string;
  dueDate: string;
  progressPercentage: number;
  stepId: number;
  description?: string;
}
