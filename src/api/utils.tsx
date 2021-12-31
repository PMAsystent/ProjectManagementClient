import { instance } from 'api';
import SnackbarUtils from '../core/utils/SnackbarUtils';
import { projectPostTaskType, projectPutTaskType } from '../core/types/api/task.request.types';
import { projectStep } from '../core/types/api/step.request.types';
import { projectDetails } from '../core/types/api/project.requests.types';

export const findUsers = async (query: string) => {
  return await instance
    .get(`/Users/findUsers?term=${query}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      SnackbarUtils.error('Wystąpił problem z wyszukiwaniem');
    });
};

export const postStep = async (data: projectStep, accessToken: string | null) => {
  return await instance.post('/Step', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

export const postTaskApi = async (data: projectPostTaskType, accessToken: string) => {
  return await instance.post('/Tasks', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

export const putTaskApi = async (data: projectPutTaskType, accessToken: string) => {
  return await instance.put('/Tasks', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

export const getProjectApi = async (projectId: number, accessToken: string | null) => {
  return await instance.get<projectDetails>(`/MyProjects/${projectId}`, { headers: { authorization: `Bearer ${accessToken}` } });
};

export const sendResetPasswordEmail = async (data: { email: string }) => {
  return await instance.post('/Auth/SendResetPasswordEmail', data);
};
