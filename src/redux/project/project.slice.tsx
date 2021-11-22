import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../api';
import { rootReducerInterface } from '../rootReducer';

export interface projectReducerInterface {
  entities: Array<any>;
  loading: boolean;
}

const INIT_STATE: projectReducerInterface = {
  entities: [],
  loading: false,
};

export const getProjects = createAsyncThunk<any, string | null, { rejectValue: string }>(
  'project/getProjects',
  async (apiToken, { rejectWithValue }) => {
    return await instance
      .get('/MyProjects', { headers: { authorization: `Bearer ${apiToken}` } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        rejectWithValue(error.response.data.title);
      });
  }
);

export const projectReducer = createSlice({
  name: 'projects',
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getProjects.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectProjects = (state: rootReducerInterface) => state.projects.entities;
export const selectLoadingProjects = (state: rootReducerInterface) => state.projects.loading;
