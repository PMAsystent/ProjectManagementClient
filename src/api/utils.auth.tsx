import { instance } from 'api';
import SnackbarUtils from '../core/utils/SnackbarUtils';
import { loginUserType, newEmailType, newPasswordType, registerUserType, resetPasswordType } from '../core/types/api/auth.types';

// refresh token
export const refreshTokenApi = async (accessToken: string | null, email: string) => {
  return await instance.post('/Auth/RefreshToken', { email }, { headers: { authorization: `Bearer ${accessToken}` } });
};

// get current user by token
export const getCurrentUserApi = async (accessToken: string | null) => {
  return await instance.get(`/Auth/GetCurrentUserByToken?token=${accessToken}`, { headers: { authorization: `Bearer ${accessToken}` } });
};

// user register
export const userRegisterApi = async (data: registerUserType) => {
  return await instance.post('/Auth/RegisterUser', data);
};

// user login
export const userLoginApi = async (data: loginUserType) => {
  return await instance.post<{ token: string; user: { email: string; id: number; userName: string }; errors: string[] }>('/Auth/LoginUser', data);
};

// user logout
export const userLogoutApi = async (email: string | undefined, accessToken: string | null) => {
  return await instance.post('/Auth/LogoutUser', { email }, { headers: { authorization: `Bearer ${accessToken}` } });
};

// user reset password
export const resetPasswordApi = async (data: resetPasswordType) => {
  return await instance.post('/Auth/ResetPassword', data);
};

// user new password
export const newPasswordApi = async (data: newPasswordType, accessToken: string | null) => {
  return await instance.post('/Auth/ChangePassword', data, { headers: { authorization: `Bearer ${accessToken}` } });
};

// email confirm
export const confirmEmail = async (queryString: string) => {
  return await instance.get(`/Auth/ConfirmEmail${queryString}`);
};

// email change
export const changeEmailApi = async (data: newEmailType, accessToken: string | null) => {
  return await instance.post('/Auth/ChangeEmail', { ...data, token: accessToken }, { headers: { authorization: `Bearer ${accessToken}` } });
};

// email reset password
export const sendResetPasswordEmailApi = async (data: { email: string }) => {
  return await instance.post('/Auth/SendResetPasswordEmail', data);
};

// find users by query string
export const findUsers = async (query: string) => {
  return await instance
    .get(`/Users/findUsers?term=${query}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      SnackbarUtils.error('Wystąpił problem z wyszukiwaniem');
    });
};
