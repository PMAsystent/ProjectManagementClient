import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectPostTaskType, projectPutTaskType } from 'core/types/api/task.request.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { postTaskApi, putTaskApi } from '../../api/utils';
import { getProject } from 'redux/project/project.slice';

export interface taskReducerInterface {
  taskPostFetchStatus: null | string;
}

const INIT_STATE: taskReducerInterface = {
  taskPostFetchStatus: null,
};

export const postTask = createAsyncThunk<any, projectPostTaskType, { state: rootReducerInterface; rejectValue: string }>(
  'task/postTask',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
      projects: { projectDetails },
    } = getState();
    postTaskApi(data, accessToken || '')
      .then(async (response) => {
        dispatch(getProject(projectDetails?.id || 0));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const putTask = createAsyncThunk<any, projectPutTaskType, { state: rootReducerInterface; rejectValue: string }>(
  'task/putTask',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
      projects: { projectDetails },
    } = getState();
    putTaskApi(data, accessToken || '')
      .then(async (response) => {
        dispatch(getProject(projectDetails?.id || 0));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const getTask = createAsyncThunk<any, number, { state: rootReducerInterface; rejectValue: string }>(
  'task/getTask',
  async (id, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await getProjectApi(id, accessToken)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data.title);
      });
  }
);

export const taskReducer = createSlice({
  name: 'tasks',
  initialState: INIT_STATE,
  reducers: {
    clearTaskPostFetchStatus(state) {
      state.taskPostFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTask.pending, (state, action) => {
        state.taskPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.taskPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Dodano taska');
      })
      .addCase(postTask.rejected, (state, action) => {
        state.taskPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodanie taska nie powiodło się');
      })
      .addCase(putTask.pending, (state, action) => {
        state.taskPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(putTask.fulfilled, (state, action) => {
        state.taskPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(putTask.rejected, (state, action) => {
        state.taskPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Zmiana stanu nie powiodła się');
      });
  },
});

export const { clearTaskPostFetchStatus } = taskReducer.actions;
export const selectTaskPostFetchStatus = (state: rootReducerInterface) => state.tasks.taskPostFetchStatus;
