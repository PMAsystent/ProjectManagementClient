import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { instance } from '../../api';
import { getProject, getProjects } from '../project/project.slice';
import { postStepType, putStepType } from '../../core/types/api/step.request.types';

export interface stepReducerInterface {
  deleteStepFetchStatus: null | string;
  postStepFetchStatus: null | string;
  putStepFetchStatus: null | string;
}

const INIT_STATE: stepReducerInterface = {
  deleteStepFetchStatus: null,
  postStepFetchStatus: null,
  putStepFetchStatus: null,
};

export const postStep = createAsyncThunk<any, postStepType, { state: rootReducerInterface; rejectValue: string }>(
  'step/postStep',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
      projects: { projectDetails },
    } = getState();
    return await instance
      .post('/Step', data, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getProjects());
        if (projectDetails) dispatch(getProject(projectDetails.id));

        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const putStep = createAsyncThunk<any, putStepType, { state: rootReducerInterface; rejectValue: string }>(
  'step/putStep',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
      projects: { projectDetails },
    } = getState();
    return await instance
      .put('/Step', data, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getProjects());
        if (projectDetails) dispatch(getProject(projectDetails.id));

        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const deleteStep = createAsyncThunk<any, number, { state: rootReducerInterface; rejectValue: string }>(
  'step/deleteStep',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const {
      auth: { accessToken },
      projects: { projectDetails },
    } = getState();
    return await instance
      .delete(`/Step/${id}`, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        dispatch(getProjects());
        if (projectDetails) dispatch(getProject(projectDetails.id));

        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data || '');
      });
  }
);

export const stepReducer = createSlice({
  name: 'step',
  initialState: INIT_STATE,
  reducers: {
    clearDeleteStepFetchStatus(state) {
      state.deleteStepFetchStatus = null;
    },
    clearPostStepFetchStatus(state) {
      state.postStepFetchStatus = null;
    },
    clearPutStepFetchStatus(state) {
      state.putStepFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteStep.rejected, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Usuwanie stepu nie powiodło się');
      })
      .addCase(deleteStep.pending, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
      })
      .addCase(deleteStep.fulfilled, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Usunięto step');
      })
      .addCase(postStep.rejected, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Dodawanie stepu nie powiodło się');
      })
      .addCase(postStep.pending, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
      })
      .addCase(postStep.fulfilled, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Dodano step');
      })
      .addCase(putStep.rejected, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Edycja stepu nie powiodła się');
      })
      .addCase(putStep.pending, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
      })
      .addCase(putStep.fulfilled, (state, action) => {
        state.deleteStepFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Edytowano step');
      });
  },
});

export const { clearDeleteStepFetchStatus, clearPostStepFetchStatus, clearPutStepFetchStatus } = stepReducer.actions;

export const selectDeleteStepFetchStatus = (state: rootReducerInterface) => state.step.deleteStepFetchStatus;
export const selectPostStepFetchStatus = (state: rootReducerInterface) => state.step.postStepFetchStatus;
export const selectPutStepFetchStatus = (state: rootReducerInterface) => state.step.putStepFetchStatus;
