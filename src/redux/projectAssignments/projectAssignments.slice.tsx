import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api';
import { postProjectAssignmentsType } from 'core/types/api/projectAssignments.request.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { getProjectApi } from 'api/utils';
import { projectAssignmentsType } from 'core/types/api/assigned.request.types';

export interface projectAssignmentsInterface {
  projectAssignmentsPutFetchStatus: null | string;
  projectAssignmentsPostFetchStatus: null | string;
  projectAssignmentsDeleteFetchStatus: null | string;
  projectAssignmentsGetFetchStatus: null | string;
  projectAssignments: Array<projectAssignmentsType>;
}

const INIT_STATE: projectAssignmentsInterface = {
  projectAssignmentsPutFetchStatus: null,
  projectAssignmentsPostFetchStatus: null,
  projectAssignmentsDeleteFetchStatus: null,
  projectAssignmentsGetFetchStatus: null,
  projectAssignments: [],
};

export const getProjectAssignments = createAsyncThunk<any, number, { state: rootReducerInterface; rejectValue: string }>(
  'projectAssignments/get',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await getProjectApi(id, accessToken)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const postProjectAssignments = createAsyncThunk<any, postProjectAssignmentsType, { state: rootReducerInterface; rejectValue: string }>(
  'projectAssignments/post',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState();
    return await instance
      .post('/ProjectAssignments', data, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getProjectAssignments(data.projectId));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const deleteProjectAssignments = createAsyncThunk<
  any,
  { userId: number; projectId: number },
  { state: rootReducerInterface; rejectValue: string }
>('projectAssignments/delete', async (data, { rejectWithValue, getState, dispatch }) => {
  const {
    auth: { accessToken },
  } = getState();
  return await instance
    .delete('/ProjectAssignments', { headers: { authorization: `Bearer ${accessToken}` }, data })
    .then((response) => {
      dispatch(getProjectAssignments(data.projectId));
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error.response?.data || '');
    });
});

export const projectAssignments = createSlice({
  name: 'projectAssignments',
  initialState: INIT_STATE,
  reducers: {
    clearProjectAssignmentsPostFetchStatus(state) {
      state.projectAssignmentsPostFetchStatus = null;
    },
    clearProjectAssignmentsDeleteFetchStatus(state) {
      state.projectAssignmentsDeleteFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectAssignments.pending, (state, action) => {
        state.projectAssignmentsGetFetchStatus = action.meta.requestStatus;
      })
      .addCase(getProjectAssignments.fulfilled, (state, action) => {
        state.projectAssignmentsGetFetchStatus = action.meta.requestStatus;
        state.projectAssignments = action.payload.projectAssignedUsers || [];
      })
      .addCase(getProjectAssignments.rejected, (state, action) => {
        state.projectAssignmentsGetFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Pobranie listy przypisanych użytkowników nie powiodło się');
      })
      .addCase(postProjectAssignments.pending, (state, action) => {
        state.projectAssignmentsPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postProjectAssignments.fulfilled, (state, action) => {
        state.projectAssignmentsPostFetchStatus = action.meta.requestStatus;
      })
      .addCase(postProjectAssignments.rejected, (state, action) => {
        state.projectAssignmentsPostFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodawanie użytkownika nie powiodło się');
      })
      .addCase(deleteProjectAssignments.pending, (state, action) => {
        state.projectAssignmentsDeleteFetchStatus = action.meta.requestStatus;
      })
      .addCase(deleteProjectAssignments.fulfilled, (state, action) => {
        state.projectAssignmentsDeleteFetchStatus = action.meta.requestStatus;
      })
      .addCase(deleteProjectAssignments.rejected, (state, action) => {
        state.projectAssignmentsDeleteFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Usuwanie użytkownika nie powiodło się');
      });
  },
});

export const { clearProjectAssignmentsPostFetchStatus, clearProjectAssignmentsDeleteFetchStatus } = projectAssignments.actions;

export const selectProjectAssignments = (state: rootReducerInterface) => state.projectAssignments.projectAssignments;
export const selectProjectAssignmentsDeleteFetchStatus = (state: rootReducerInterface) =>
  state.projectAssignments.projectAssignmentsDeleteFetchStatus;
export const selectProjectAssignmentsPostFetchStatus = (state: rootReducerInterface) => state.projectAssignments.projectAssignmentsPostFetchStatus;
