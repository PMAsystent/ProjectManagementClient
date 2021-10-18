import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export default createStore;
