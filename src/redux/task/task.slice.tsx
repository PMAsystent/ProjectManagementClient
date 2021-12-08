import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { projectTask } from 'core/types/api/task.request.types';
import { instance } from 'api';
import SnackbarUtils from 'core/utils/SnackbarUtils';

export interface taskReducerInterface {
  taskPutFetchStatus: null | string;
}

const INIT_STATE: taskReducerInterface = {
  taskPutFetchStatus: null,
};

export const putTask = createAsyncThunk<any, projectTask, { state: rootReducerInterface; rejectValue: string }>(
  'task/postTask',
  async (data, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .put('/Tasks', data, { headers: { authorization: `Bearer ${accessToken}` } })
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
    clearTaskPutFetchStatus(state) {
      state.taskPutFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(putTask.pending, (state, action) => {
        state.taskPutFetchStatus = action.meta.requestStatus;
      })
      .addCase(putTask.fulfilled, (state, action) => {
        state.taskPutFetchStatus = action.meta.requestStatus;
      })
      .addCase(putTask.rejected, (state, action) => {
        state.taskPutFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Wsytąpił problem z aktualizacją');
      });
  },
});

export const { clearTaskPutFetchStatus } = taskReducer.actions;
export const selectTaskPutFetchStatus = (state: rootReducerInterface) => state.tasks.taskPutFetchStatus;
