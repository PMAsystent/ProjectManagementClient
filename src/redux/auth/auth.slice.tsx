import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'api';
import { loginUserType, registerUserType } from 'core/types/requests/auth.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { rootReducerInterface } from '../rootReducer';

export interface authReducerInterface {
  registerFetchStatus: null | string;
  loginFetchStatus: null | string;
  accessToken: null | string;
}

const INIT_STATE: authReducerInterface = {
  registerFetchStatus: null,
  loginFetchStatus: null,
  accessToken: null,
};

export const postRegister = createAsyncThunk<any, registerUserType, { rejectValue: string }>('auth/register', async (data, { rejectWithValue }) => {
  return await instance
    .post('/Auth/RegisterUser', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => rejectWithValue(error.response.data.title));
});

export const postLogin = createAsyncThunk<any, loginUserType, { rejectValue: string }>('auth/login', async (data, { rejectWithValue }) => {
  return await instance
    .post('/Auth/LoginUser', data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => rejectWithValue(error.response.data.title));
});

export const authReducer = createSlice({
  name: 'auth',
  initialState: INIT_STATE,
  reducers: {
    logout(state) {
      state.accessToken = null;
    },
    clearRegisterFetchStatus(state) {
      state.registerFetchStatus = null;
    },
    clearLoginFetchStatus(state) {
      state.loginFetchStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRegister.pending, (state, action) => {
        state.registerFetchStatus = action.meta.requestStatus;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.registerFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Zarejestrowano pomyślnie');
      })
      .addCase(postRegister.rejected, (state, action) => {
        state.registerFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Nie udało się zarejestrować');
      })
      .addCase(postLogin.pending, (state, action) => {
        state.loginFetchStatus = action.meta.requestStatus;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loginFetchStatus = action.meta.requestStatus;
        state.accessToken = action.payload;
        SnackbarUtils.success('Zalogowano pomyślnie');
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loginFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Nie udało się zalogować');
      });
  },
});

export const { logout, clearLoginFetchStatus, clearRegisterFetchStatus } = authReducer.actions;

export const selectAccessToken = (state: rootReducerInterface) => state.auth.accessToken;
export const selectLoginFetchStatus = (state: rootReducerInterface) => state.auth.loginFetchStatus;
export const selectRegisterFetchStatus = (state: rootReducerInterface) => state.auth.registerFetchStatus;
