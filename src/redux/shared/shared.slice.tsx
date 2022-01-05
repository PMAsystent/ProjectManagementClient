import { rootReducerInterface } from '../rootReducer';
import { createSlice } from '@reduxjs/toolkit';

export interface sharedReducerInterface {
  projectSearch: string;
  taskSearch: string;
}

const INIT_STATE: sharedReducerInterface = {
  projectSearch: '',
  taskSearch: '',
};

export const sharedReducer = createSlice({
  name: 'shared',
  initialState: INIT_STATE,
  reducers: {
    changeProjectSearch(state, data: any) {
      state.projectSearch = data.payload;
    },
    changeTaskSearch(state, data: any) {
      state.taskSearch = data.payload;
    },
  },
});

export const { changeProjectSearch, changeTaskSearch } = sharedReducer.actions;

export const selectProjectSearch = (state: rootReducerInterface) => state.shared.projectSearch;
export const selectTaskSearch = (state: rootReducerInterface) => state.shared.taskSearch;
