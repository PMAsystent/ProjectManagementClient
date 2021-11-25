import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../api';
import { rootReducerInterface } from '../rootReducer';
import { myProjectsType, postProjectType, projectType } from '../../core/types/api/project.requests.types';
import SnackbarUtils from '../../core/utils/SnackbarUtils';

export interface projectReducerInterface {
  projectList: Array<projectType>;
  projectListFetchStatus: null | string;
  projectPostFetchStatus: null | string;
}

const INIT_STATE: projectReducerInterface = {
  projectList: [],
  projectListFetchStatus: null,
  projectPostFetchStatus: null,
};

export const getProjects = createAsyncThunk<any, void, { state: rootReducerInterface; rejectValue: string }>(
  'project/getProjects',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .get<myProjectsType>('/MyProjects', { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        return response.data.projectsList ?? [];
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.title);
      });
  }
);

export const postProject = createAsyncThunk<any, postProjectType, { state: rootReducerInterface; rejectValue: string }>(
  'project/postProject',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .post('/MyProjects', data, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getProjects());
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const projectReducer = createSlice({
  name: 'projects',
  initialState: INIT_STATE,
  reducers: {
    clearProjectPostFetchStatus(state) {
      state.projectPostFetchStatus = null;
    },
  },
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
      })
      .addCase(postProject.pending, (state, action) => {
        state.projectPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postProject.fulfilled, (state, action) => {
        state.projectPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Dodano projekt');
      })
      .addCase(postProject.rejected, (state, action) => {
        state.projectPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodanie projektu nie powiodło się');
      });
  },
});

export const { clearProjectPostFetchStatus } = projectReducer.actions;

export const selectProjects = (state: rootReducerInterface) => state.projects.projectList;
export const selectLoadingProjects = (state: rootReducerInterface) => state.projects.projectListFetchStatus;
export const selectProjectPostFetchStatus = (state: rootReducerInterface) => state.projects.projectPostFetchStatus;
