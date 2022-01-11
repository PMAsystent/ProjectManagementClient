import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteTaskAssignmentsType, postTaskAssignmentsType } from 'core/types/api/taskAssignments.request.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { rootReducerInterface } from 'redux/rootReducer';
import { getTask } from 'redux/task/task.slice';
import { deleteTaskAssignmentApi, postTaskAssignmentApi } from '../../api/utils.taskAssignment';

export interface taskAssignmentsInterface {
  taskAssignmentsPostFetchStatus: null | string;
  taskAssignmentsDeleteFetchStatus: null | string;
}

const INIT_STATE: taskAssignmentsInterface = {
  taskAssignmentsPostFetchStatus: null,
  taskAssignmentsDeleteFetchStatus: null,
};

export const postTaskAssignment = createAsyncThunk<any, postTaskAssignmentsType, { state: rootReducerInterface; rejectValue: string }>(
  'taskAssignments/post',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return postTaskAssignmentApi(data, accessToken || '')
      .then((response) => {
        dispatch(getTask(data.taskId));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const deleteTaskAssignment = createAsyncThunk<any, deleteTaskAssignmentsType, { state: rootReducerInterface; rejectValue: string }>(
  'taskAssignments/delete',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return deleteTaskAssignmentApi(data, accessToken || '')
      .then((response) => {
        dispatch(getTask(data.taskId));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const taskAssignments = createSlice({
  name: 'taskAssignments',
  initialState: INIT_STATE,
  reducers: {
    clearTaskAssignmentsPostFetchStatus(state) {
      state.taskAssignmentsPostFetchStatus = null;
    },
    clearTaskAssignmentsDeleteFetchStatus(state) {
      state.taskAssignmentsDeleteFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTaskAssignment.pending, (state, action) => {
        state.taskAssignmentsPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postTaskAssignment.fulfilled, (state, action) => {
        state.taskAssignmentsPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postTaskAssignment.rejected, (state, action) => {
        state.taskAssignmentsPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodawanie użytkownika nie powiodło się');
      })
      .addCase(deleteTaskAssignment.pending, (state, action) => {
        state.taskAssignmentsDeleteFetchStatus = action.meta.requestStatus;
      })
      .addCase(deleteTaskAssignment.fulfilled, (state, action) => {
        state.taskAssignmentsDeleteFetchStatus = action.meta.requestStatus;
      })
      .addCase(deleteTaskAssignment.rejected, (state, action) => {
        state.taskAssignmentsDeleteFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Usuwanie użytkownika nie powiodło się');
      });
  },
});

export const { clearTaskAssignmentsDeleteFetchStatus, clearTaskAssignmentsPostFetchStatus } = taskAssignments.actions;
