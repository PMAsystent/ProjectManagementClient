import { deleteTaskAssignmentsType, postTaskAssignmentsType } from '../core/types/api/taskAssignments.request.types';
import { instance } from './index';

// post task assignment
export const postTaskAssignmentApi = async (data: postTaskAssignmentsType, accessToken: string | null) => {
  return await instance.post('/TaskAssignment', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// delete task assignment
export const deleteTaskAssignmentApi = async (data: deleteTaskAssignmentsType, accessToken: string | null) => {
  return await instance.delete('/TaskAssignment', { headers: { authorization: `Bearer ${accessToken}` }, data });
};
