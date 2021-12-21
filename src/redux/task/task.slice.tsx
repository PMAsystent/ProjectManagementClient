import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectPostTaskType, projectPutTaskType } from 'core/types/api/task.request.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { postTaskApi, putTaskApi } from '../../api/utils';

export interface taskReducerInterface {
  taskPostFetchStatus: null | string;
}

const INIT_STATE: taskReducerInterface = {
  taskPostFetchStatus: null,
};

export const postTask = createAsyncThunk<any, projectPostTaskType, { state: rootReducerInterface; rejectValue: string }>(
  'task/postTask',
  async (data, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();
    postTaskApi(data, accessToken || '')
      .then((response) => {
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
    } = getState();
    putTaskApi(data, accessToken || '')
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
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
