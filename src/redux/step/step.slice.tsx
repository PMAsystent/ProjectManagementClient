import { rootReducerInterface } from '../rootReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { instance } from '../../api';
import { getProject, getProjects } from '../project/project.slice';

export interface stepReducerInterface {
  deleteStepFetchStatus: null | string;
}

const INIT_STATE: stepReducerInterface = {
  deleteStepFetchStatus: null,
};

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
      });
  },
});

export const { clearDeleteStepFetchStatus } = stepReducer.actions;

export const selectDeleteStepFetchStatus = (state: rootReducerInterface) => state.step.deleteStepFetchStatus;
