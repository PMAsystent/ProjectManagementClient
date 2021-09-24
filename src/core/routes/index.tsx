import React, {lazy} from 'react'
import AuthLayout from '../../layouts/AuthLayout';

// paths
export const getLoginPath = '/auth/login';
export const getRegisterPath = '/auth/register';
export const getForgotPasswordPath = '/auth/forgotpassword';

// containers
const Login = lazy(() => import("../../containers/Login"));
const Register = lazy(() => import("../../containers/Register"));
const ForgotPassword = lazy(() => import("../../containers/ForgotPassword"));


const routes = [
  {
    path: `${getLoginPath}`,
    exact: true,
    name: 'Login',
    state: 'login',
    component: () =>
      (
        <AuthLayout>
          <Login/>
        </AuthLayout>
      )
  },
  {
    path: `${getRegisterPath}`,
    exact: true,
    name: 'Register',
    state: 'register',
    component: () =>
      (
        <AuthLayout>
          <Register/>
        </AuthLayout>
      )
  },
  {
    path: `${getForgotPasswordPath}`,
    exact: true,
    name: 'Forgot Password',
    state: 'forgotPassword',
    component: () =>
      (
        <AuthLayout>
          <ForgotPassword/>
        </AuthLayout>
      )
  },
];

export default routes