import { instance } from 'api';
import SnackbarUtils from '../core/utils/SnackbarUtils';
import { projectTask } from '../core/types/api/task.request.types';
import { projectStep } from '../core/types/api/step.request.types';

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

export const putTaskApi = async (data: projectTask, accessToken: string) => {
  return await instance.put('/Tasks', data, { headers: { authorization: `Bearer ${accessToken}` } });
};
