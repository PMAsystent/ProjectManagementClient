import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rootReducerInterface } from '../rootReducer';
import { postSubtaskApi, postTaskApi } from '../../api/utils';
import { projectPostSubtaskType, projectSubtask } from '../../core/types/api/subtask.request.types';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import { getTask } from 'redux/task/task.slice';
import { instance } from 'api';

export interface subtaskReducerInterface {
  subtaskPostFetchStatus: null | string;
  subtaskPutStateStatus: null | string;
  subtaskPutNameStatus: null | string;
  subtaskDeleteStatus: null | string;
}

const INIT_STATE: subtaskReducerInterface = {
  subtaskPostFetchStatus: null,
  subtaskPutStateStatus: null,
  subtaskPutNameStatus: null,
  subtaskDeleteStatus: null,
};

export const postSubtask = createAsyncThunk<any, projectPostSubtaskType, { state: rootReducerInterface; rejectValue: string }>(
  'subtask/postSubtask',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
      projects: { projectDetails },
    } = getState();
    postSubtaskApi(data, accessToken || '')
      .then(async (response) => {
        dispatch(getTask(data.taskId || 0));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const deleteSubtask = createAsyncThunk<any, { id: number; taskId: number }, { state: rootReducerInterface; rejectValue: string }>(
  'subtask/deleteSubtask',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .delete(`/Subtasks/${data.id}`, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getTask(data.taskId || 0));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const subtaskReducer = createSlice({
  name: 'subtask',
  initialState: INIT_STATE,
  reducers: {
    clearSubtaskPostFetchStatus(state) {
      state.subtaskPostFetchStatus = null;
    },
    clearSubtaskPutStateStatus(state) {
      state.subtaskPutStateStatus = null;
    },
    clearSubtaskPutNameStatus(state) {
      state.subtaskPutNameStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSubtask.pending, (state, action) => {
        state.subtaskPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postSubtask.fulfilled, (state, action) => {
        state.subtaskPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Dodano subtaska');
      })
      .addCase(postSubtask.rejected, (state, action) => {
        state.subtaskPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodanie subtaska nie powiodło się');
      })
      .addCase(deleteSubtask.pending, (state, action) => {
        state.subtaskDeleteStatus = action.meta.requestStatus;
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.subtaskDeleteStatus = action.meta.requestStatus;
        SnackbarUtils.success('Usunięto subtaska');
      })
      .addCase(deleteSubtask.rejected, (state, action) => {
        state.subtaskDeleteStatus = action.meta.requestStatus;
        SnackbarUtils.error('Usuwanie subtaska nie powiodło się');
      });
  },
});
