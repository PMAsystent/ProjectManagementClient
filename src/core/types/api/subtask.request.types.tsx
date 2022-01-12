
export interface projectSubtask {
  id: number;
  name: string;
  isDone: boolean;
  taskId: number;
}
export interface projectPostSubtaskType extends Omit<projectSubtask, 'id'> {}
