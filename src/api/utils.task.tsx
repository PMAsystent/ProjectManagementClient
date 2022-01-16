import { projectPostTaskType, projectPutTaskType, taskDetailsType } from '../core/types/api/task.request.types';
import { instance } from './index';

// post task
export const postTaskApi = async (data: projectPostTaskType, accessToken: string) => {
  return await instance.post('/Tasks', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// put task
export const putTaskApi = async (data: projectPutTaskType, accessToken: string) => {
  return await instance.put('/Tasks', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// get task by taskId
export const getTaskApi = async (taskId: number, accessToken: string | null) => {
  return await instance.get<taskDetailsType>(`/Tasks/${taskId}`, { headers: { authorization: `Bearer ${accessToken}` } });
};

// delete task
export const deleteTaskApi = async (id: number, accessToken: string) => {
  return await instance.delete(`/Tasks/${id}`, { headers: { authorization: `Bearer ${accessToken}` } });
};
