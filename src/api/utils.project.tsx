import { myProjectsType, postProjectType, projectDetailsType, putProjectType } from '../core/types/api/project.requests.types';
import { instance } from './index';

// get all projects
export const getProjectsApi = async (accessToken: string | null) => {
  return await instance.get<myProjectsType>('/MyProjects', { headers: { authorization: `Bearer ${accessToken}` } });
};

// get project by id
export const getProjectApi = async (projectId: number, accessToken: string | null) => {
  return await instance.get<projectDetailsType>(`/MyProjects/${projectId}`, { headers: { authorization: `Bearer ${accessToken}` } });
};

// post project
export const postProjectApi = async (data: postProjectType, accessToken: string | null) => {
  return await instance.post('/MyProjects', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// put project
export const putProjectApi = async (data: putProjectType, accessToken: string | null) => {
  return await instance.put(`/MyProjects`, data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// delete project
export const deleteProjectApi = async (projectId: number, accessToken: string | null) => {
  return await instance.delete(`/MyProjects/${projectId}`, { headers: { authorization: `Bearer ${accessToken}` } });
};

// patch project
export const patchProjectApi = async (projectId: number, isActive: boolean, accessToken: string | null) => {
  return await instance.patch(`/MyProjects/${projectId}/archive/${isActive}`, {}, { headers: { authorization: `Bearer ${accessToken}` } });
};
