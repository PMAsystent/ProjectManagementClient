import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api';
import { taskAssignmentsType } from 'core/types/api/assigned.request.types';
import { postTaskAssignmentsType } from 'core/types/api/taskAssignments.request.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { rootReducerInterface } from 'redux/rootReducer';

export interface taskAssignmentsInterface {
  taskAssignmentsPostFetchStatus: null | string;
  taskAssignmentsDeleteFetchStatus: null | string;
  taskAssignments: Array<taskAssignmentsType>;
}

const INIT_STATE: taskAssignmentsInterface = {
  taskAssignmentsPostFetchStatus: null,
  taskAssignmentsDeleteFetchStatus: null,
  taskAssignments: [],
};

  export const postTaskAssignments = createAsyncThunk<any, postTaskAssignmentsType, { state: rootReducerInterface; rejectValue: string }>(
    'taskAssignments/post',
    async (data, { rejectWithValue, getState, dispatch }) => {
      const {
        auth: { accessToken },
      } = getState();
      return await instance
        .post('/TaskAssignments', data, { headers: { authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          //dispatch(getTaskAssignments(data.projectId));
          return response.data;
        })
        .catch((error) => {
          return rejectWithValue(error.response?.data || '');
        });
    }
  );

  export const deleteTaskAssignments = createAsyncThunk<
    any,
    { userId: number; projectId: number },
    { state: rootReducerInterface; rejectValue: string }
  >('projectAssignments/delete', async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .delete('/TaskAssignments', { headers: { authorization: `Bearer ${accessToken}` }, data })
      .then((response) => {
        //dispatch(getTaskAssignments(data.projectId));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  });

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
      .addCase(postTaskAssignments.pending, (state, action) => {
        state.taskAssignmentsPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postTaskAssignments.fulfilled, (state, action) => {
        state.taskAssignmentsPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Dodano użytkownika');
      })
      .addCase(postTaskAssignments.rejected, (state, action) => {
        state.taskAssignmentsPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodawanie użytkownika nie powiodło się');
      })
      .addCase(deleteTaskAssignments.pending, (state, action) => {
        state.taskAssignmentsDeleteFetchStatus = action.meta.requestStatus;
      })
      .addCase(deleteTaskAssignments.fulfilled, (state, action) => {
        state.taskAssignmentsDeleteFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Usunięto użytkownika');
      })
      .addCase(deleteTaskAssignments.rejected, (state, action) => {
        state.taskAssignmentsDeleteFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Usuwanie użytkownika nie powiodło się');
      })
  },
});
