import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserType, newPasswordType, registerUserType, resetPasswordType } from 'core/types/api/auth.types';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { rootReducerInterface } from '../rootReducer';
import {
  confirmEmail,
  getCurrentUserApi,
  newPasswordApi,
  refreshTokenApi,
  resetPasswordApi,
  userLoginApi,
  userLogoutApi,
  userRegisterApi,
} from '../../api/utils.auth';

export interface authReducerInterface {
  registerFetchStatus: null | string;
  loginFetchStatus: null | string;
  accessToken: null | string;
  user: null | { email: string; userId: number; userName: string };
  userFetchStatus: null | string;
  postResetPasswordFetchStatus: null | string;
  postNewPasswordFetchStatus: null | string;
  getConfirmEmailFetchStatus: null | string;
  postRefreshTokenFetchStatus: null | string;
}

const INIT_STATE: authReducerInterface = {
  registerFetchStatus: null,
  loginFetchStatus: null,
  accessToken: null,
  user: null,
  userFetchStatus: null,
  postNewPasswordFetchStatus: null,
  postResetPasswordFetchStatus: null,
  getConfirmEmailFetchStatus: null,
  postRefreshTokenFetchStatus: null,
};

export const postRegister = createAsyncThunk<any, registerUserType, { rejectValue: string }>(
  'auth/registeruser',
  async (data, { rejectWithValue }) => {
    return userRegisterApi(data)
      .then((response: any) => {
        if (response.data?.errors && response.data.errors.length > 0) {
          return rejectWithValue(response.data.errors[0]);
        }
        return response.data;
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const postRefreshToken = createAsyncThunk<any, void, { state: rootReducerInterface; rejectValue: string }>(
  'auth/refreshtoken',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken, user },
    } = getState();

    let email;
    if (user) {
      email = user.email;
    }
    return refreshTokenApi(accessToken, email || '')
      .then((response: any) => {
        if (response.data?.errors && response.data.errors.length > 0) {
          return rejectWithValue(response.data.errors[0]);
        }
        return response.data;
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const getCurrentUser = createAsyncThunk<any, void, { state: rootReducerInterface; rejectValue: string }>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();

    return getCurrentUserApi(accessToken || '')
      .then((response) => {
        return response.data;
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const postLogin = createAsyncThunk<any, loginUserType, { rejectValue: string }>('auth/login', async (data, { rejectWithValue }) => {
  return userLoginApi(data)
    .then((response) => {
      if (response.data?.errors && response.data.errors.length > 0) {
        return rejectWithValue(response.data.errors[0]);
      }
      if (!response.data?.user) {
        return rejectWithValue('Nie znaleziono użytkownika');
      }
      return response.data;
    })
    .catch((error) => rejectWithValue(error.response.data.title));
});

export const postLogout = createAsyncThunk<any, void, { state: rootReducerInterface; rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken, user },
    } = getState();

    let email;
    if (user) {
      email = user.email;
    }

    return userLogoutApi(email, accessToken || '')
      .then((response) => {
        return response.data;
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const getConfirmEmail = createAsyncThunk<any, string, { rejectValue: string }>(
  'auth/confirmEmail',
  async (queryString, { rejectWithValue }) => {
    return confirmEmail(queryString)
      .then((response) => {
        if (response.data) {
          return response.data;
        } else {
          return rejectWithValue('Wystąpił problem z potwierdzeniem');
        }
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const postResetPassword = createAsyncThunk<any, resetPasswordType, { state: rootReducerInterface; rejectValue: string }>(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    return resetPasswordApi(data)
      .then((response: any) => {
        if (response.data?.errors && response.data.errors.length > 0) {
          return rejectWithValue(response.data.errors[0]);
        }
        return response.data;
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const postNewPassword = createAsyncThunk<any, newPasswordType, { state: rootReducerInterface; rejectValue: string }>(
  'auth/newPassword',
  async (data, { rejectWithValue, getState }) => {
    const {
      auth: { accessToken },
    } = getState();
    return newPasswordApi(data, accessToken || '')
      .then((response: any) => {
        if (response.data?.errors && response.data.errors.length > 0) {
          return rejectWithValue(response.data.errors[0]);
        }
        return response.data;
      })
      .catch((error) => rejectWithValue(error.response.data.title));
  }
);

export const authReducer = createSlice({
  name: 'auth',
  initialState: INIT_STATE,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.postResetPasswordFetchStatus = null;
    },
    clearRegisterFetchStatus(state) {
      state.registerFetchStatus = null;
    },
    clearLoginFetchStatus(state) {
      state.loginFetchStatus = null;
    },
    clearPostResetPasswordFetchStatus(state) {
      state.postResetPasswordFetchStatus = null;
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
        SnackbarUtils.error(action.payload || 'Nie udało się zarejestrować');
      })
      .addCase(getConfirmEmail.pending, (state, action) => {
        state.getConfirmEmailFetchStatus = action.meta.requestStatus;
      })
      .addCase(getConfirmEmail.fulfilled, (state, action) => {
        state.getConfirmEmailFetchStatus = action.meta.requestStatus;
      })
      .addCase(getConfirmEmail.rejected, (state, action) => {
        state.getConfirmEmailFetchStatus = action.meta.requestStatus;
      })
      .addCase(postLogin.pending, (state, action) => {
        state.loginFetchStatus = action.meta.requestStatus;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loginFetchStatus = action.meta.requestStatus;
        state.accessToken = action.payload.token;
        state.user = {
          userName: action.payload.user.userName,
          email: action.payload.user.email,
          userId: action.payload.user.id,
        };
        SnackbarUtils.success('Zalogowano pomyślnie');
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.loginFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error(action.payload || 'Nie udało się zalogować');
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.userFetchStatus = action.meta.requestStatus;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.userFetchStatus = action.meta.requestStatus;
        state.user = {
          userName: action.payload.user.userName,
          email: action.payload.user.email,
          userId: action.payload.user.id,
        };
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.userFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error('Pobieranie danych nie powiodło się');
      })
      .addCase(postResetPassword.pending, (state, action) => {
        state.postResetPasswordFetchStatus = action.meta.requestStatus;
      })
      .addCase(postResetPassword.fulfilled, (state, action) => {
        state.postResetPasswordFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Zmieniono hasło');
      })
      .addCase(postResetPassword.rejected, (state, action) => {
        state.postResetPasswordFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error(action.payload || 'Zmiana hasła nie powiodła się');
      })
      .addCase(postNewPassword.pending, (state, action) => {
        state.postNewPasswordFetchStatus = action.meta.requestStatus;
      })
      .addCase(postNewPassword.fulfilled, (state, action) => {
        state.postNewPasswordFetchStatus = action.meta.requestStatus;
        SnackbarUtils.success('Zmieniono hasło');
      })
      .addCase(postNewPassword.rejected, (state, action) => {
        state.postNewPasswordFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error(action.payload || 'Zmiana hasła nie powiodła się');
      })
      .addCase(postRefreshToken.pending, (state, action) => {
        state.postRefreshTokenFetchStatus = action.meta.requestStatus;
      })
      .addCase(postRefreshToken.fulfilled, (state, action) => {
        state.postRefreshTokenFetchStatus = action.meta.requestStatus;
        if (action.payload.token) state.accessToken = action.payload.token;
      })
      .addCase(postRefreshToken.rejected, (state, action) => {
        state.postRefreshTokenFetchStatus = action.meta.requestStatus;
        SnackbarUtils.error(action.payload || 'Sesja wygasła - wylogowano użytkownika');
      });
  },
});

export const { logout, clearLoginFetchStatus, clearRegisterFetchStatus, clearPostResetPasswordFetchStatus } = authReducer.actions;

export const selectAccessToken = (state: rootReducerInterface) => state.auth.accessToken;
export const selectUser = (state: rootReducerInterface) => state.auth.user;
export const selectLoginFetchStatus = (state: rootReducerInterface) => state.auth.loginFetchStatus;
export const selectRegisterFetchStatus = (state: rootReducerInterface) => state.auth.registerFetchStatus;
export const selectGetConfirmEmailFetchStatus = (state: rootReducerInterface) => state.auth.getConfirmEmailFetchStatus;
export const selectPostResetPasswordFetchStatus = (state: rootReducerInterface) => state.auth.postResetPasswordFetchStatus;
export const selectPostRefreshTokenFetchStatus = (state: rootReducerInterface) => state.auth.postRefreshTokenFetchStatus;
