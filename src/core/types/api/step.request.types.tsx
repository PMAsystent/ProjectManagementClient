export interface projectStep {
  id: number;
  name: string;
  progressPercentage: number;
}

export interface postStepType {
  name: string;
  description: string;
  projectId: number;
}

export interface putStepType {
  id: number;
  name: string;
}
