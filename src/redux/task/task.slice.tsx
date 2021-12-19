import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectTask } from 'core/types/api/task.request.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { postTaskApi } from '../../api/utils';

export interface taskReducerInterface {
  taskPostFetchStatus: null | string;
}

const INIT_STATE: taskReducerInterface = {
  taskPostFetchStatus: null,
};

export const postTask = createAsyncThunk<any, projectTask, { state: rootReducerInterface; rejectValue: string }>(
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
      });
  },
});

export const { clearTaskPostFetchStatus: clearTaskPostFetchStatus } = taskReducer.actions;
export const selectTaskPostFetchStatus = (state: rootReducerInterface) => state.tasks.taskPostFetchStatus;
