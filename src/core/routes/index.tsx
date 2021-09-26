import React, {lazy, Suspense} from 'react'
import AuthLayout from '../../layouts/AuthLayout';
import AuthSpinner from '../../components/AuthSpinner';

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
          <Suspense fallback={<AuthSpinner/>}>
            <Login/>
          </Suspense>
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
          <Suspense fallback={<AuthSpinner/>}>
            <Register/>
          </Suspense>
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
          <Suspense fallback={<AuthSpinner/>}>
            <ForgotPassword/>
          </Suspense>
        </AuthLayout>
      )
  },
];

export default routes