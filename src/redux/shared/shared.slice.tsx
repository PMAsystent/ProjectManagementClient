import { rootReducerInterface } from '../rootReducer';
import { createSlice } from '@reduxjs/toolkit';

export interface sharedReducerInterface {
  projectSearch: string;
  taskSearch: string;
  withArchive: boolean;
}

const INIT_STATE: sharedReducerInterface = {
  projectSearch: '',
  taskSearch: '',
  withArchive: false,
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
    changeWithArchive(state, data: any) {
      state.withArchive = data.payload;
    },
  },
});

export const { changeProjectSearch, changeTaskSearch, changeWithArchive } = sharedReducer.actions;

export const selectProjectSearch = (state: rootReducerInterface) => state.shared.projectSearch;
export const selectTaskSearch = (state: rootReducerInterface) => state.shared.taskSearch;
export const selectWithArchive = (state: rootReducerInterface) => state.shared.withArchive;
