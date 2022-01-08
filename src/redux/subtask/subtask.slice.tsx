import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rootReducerInterface } from '../rootReducer';
import { postSubtaskApi, postTaskApi } from '../../api/utils';
import { getProject } from '../project/project.slice';
import { projectPostSubtaskType, projectSubtask } from '../../core/types/api/subtask.request.types';
import SnackbarUtils from '../../core/utils/SnackbarUtils';

export interface subtaskReducerInterface {
  subtaskPostFetchStatus: null | string;
  subtaskPutStateStatus: null | string;
  subtaskPutNameStatus: null | string;
}

const INIT_STATE: subtaskReducerInterface = {
  subtaskPostFetchStatus: null,
  subtaskPutStateStatus: null,
  subtaskPutNameStatus: null,
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
        dispatch(getProject(projectDetails?.id || 0));
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
      })}
});