import { instance } from './index';
import { postStepType, putStepType } from '../core/types/api/step.request.types';

// post step
export const postStepApi = async (data: postStepType, accessToken: string | null) => {
  return await instance.post('/Step', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// put step
export const putStepApi = async (data: putStepType, accessToken: string | null) => {
  return await instance.put('/Step', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// delete step
export const deleteStepApi = async (stepId: number, accessToken: string | null) => {
  return await instance.delete(`/Step/${stepId}`, { headers: { authorization: `Bearer ${accessToken}` } });
};
