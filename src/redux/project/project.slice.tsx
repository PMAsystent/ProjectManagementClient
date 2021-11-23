import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../api';
import { rootReducerInterface } from '../rootReducer';
import { myProjectsType, projectType } from '../../core/types/requests/project.types';

export interface projectReducerInterface {
  projectList: Array<projectType>;
  projectListFetchStatus: null | string;
}

const INIT_STATE: projectReducerInterface = {
  projectList: [],
  projectListFetchStatus: null,
};
export const getProjects = createAsyncThunk<any, string | null, { rejectValue: string }>(
  'project/getProjects',
  async (apiToken, { rejectWithValue }) => {
    return await instance
      .get<myProjectsType>('/MyProjects', { headers: { authorization: `Bearer ${apiToken}` } })
      .then((response) => {
        return response.data.projectsList ?? [];
      })
      .catch((error) => {
        rejectWithValue(error.response.data.title);
      });
  }
);

export const projectReducer = createSlice({
  name: 'projects',
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state, action) => {
        state.projectListFetchStatus = action.meta.requestStatus;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projectListFetchStatus = action.meta.requestStatus;
        state.projectList = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.projectListFetchStatus = action.meta.requestStatus;
      });
  },
});

export const selectProjects = (state: rootReducerInterface) => state.projects.projectList;
export const selectLoadingProjects = (state: rootReducerInterface) => state.projects.projectListFetchStatus;
