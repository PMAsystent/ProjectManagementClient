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

export interface postProjectType {
  name: string;
  description: string;
  dueDate: string;
  assignedUsers: Array<{ userId: number; projectRole: string; memberType: string }>;
}
