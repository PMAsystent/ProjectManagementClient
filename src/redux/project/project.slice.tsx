import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../api';
import { rootReducerInterface } from '../rootReducer';
import { myProjectsType, postProjectType, projectDetails, projectType, putProjectType } from '../../core/types/api/project.requests.types';
import SnackbarUtils from '../../core/utils/SnackbarUtils';

export interface projectReducerInterface {
  projectList: Array<projectType>;
  projectDetails: null | projectDetails;
  projectListFetchStatus: null | string;
  projectDetailsFetchStatus: null | string;
  projectPostFetchStatus: null | string;
  projectPutFetchStatus: null | string;
}

const INIT_STATE: projectReducerInterface = {
  projectList: [],
  projectDetails: null,
  projectListFetchStatus: null,
  projectDetailsFetchStatus: null,
  projectPostFetchStatus: null,
  projectPutFetchStatus: null,
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

export const getProject = createAsyncThunk<any, number, { state: rootReducerInterface; rejectValue: string }>(
  'project/getProject',
  async (id, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .get<myProjectsType>(`/MyProjects/${id}`, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        return response.data;
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

export const putProject = createAsyncThunk<any, putProjectType, { state: rootReducerInterface; rejectValue: string }>(
  'project/putProject',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .put('/MyProjects', data, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getProject(data.id));
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
    clearProjectPutFetchStatus(state) {
      state.projectPutFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProject.pending, (state, action) => {
        state.projectDetailsFetchStatus = action.meta.requestStatus;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.projectDetailsFetchStatus = action.meta.requestStatus;
        state.projectDetails = action.payload;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.projectDetailsFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Pobranie projektu nie powiodło się');
      })
      .addCase(getProjects.pending, (state, action) => {
        state.projectListFetchStatus = action.meta.requestStatus;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projectListFetchStatus = action.meta.requestStatus;
        state.projectList = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.projectListFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Pobranie projektów nie powiodło się');
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
      })
      .addCase(putProject.pending, (state, action) => {
        state.projectPutFetchStatus = action.meta.requestStatus;
      })
      .addCase(putProject.fulfilled, (state, action) => {
        state.projectPutFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Zaktualizowano projekt');
      })
      .addCase(putProject.rejected, (state, action) => {
        state.projectPutFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Aktualizacja się nie powiodła');
      });
  },
});

export const { clearProjectPostFetchStatus, clearProjectPutFetchStatus } = projectReducer.actions;

export const selectProjects = (state: rootReducerInterface) => state.projects.projectList;
export const selectProjectsListFetchStatus = (state: rootReducerInterface) => state.projects.projectListFetchStatus;
export const selectProjectPostFetchStatus = (state: rootReducerInterface) => state.projects.projectPostFetchStatus;
export const selectProjectDetails = (state: rootReducerInterface) => state.projects.projectDetails;
export const selectProjectDetailsFetchStatus = (state: rootReducerInterface) => state.projects.projectDetailsFetchStatus;
export const selectProjectPutFetchStatus = (state: rootReducerInterface) => state.projects.projectPutFetchStatus;
