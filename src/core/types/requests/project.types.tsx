export interface projectType {
  id: number;
  name: string;
  dueDate: string;
  isActive: boolean;
  progressPercentage: number;
}

export interface myProjectsType {
  projectsList: Array<projectType>;
  count: number;
}
