import { instance } from 'api';
import { projectPostSubtaskType } from 'core/types/api/subtask.request.types';

export const postSubtaskApi = async (data: projectPostSubtaskType, accessToken: string) => {
  return await instance.post('/Subtasks', data, { headers: { authorization: `Bearer ${accessToken}` } });
};
