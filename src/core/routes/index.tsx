import React, { lazy, Suspense } from 'react';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import AuthSpinner from 'components/AuthSpinner/AuthSpinner';

// paths
export const getLoginPath = '/auth/login';
export const getRegisterPath = '/auth/register';
export const getForgotPasswordPath = '/auth/forgotpassword';
export const getDashboardPath = '/';

// containers
const Login = lazy(() => import('containers/Login/Login'));
const Register = lazy(() => import('containers/Register/Register'));
const ForgotPassword = lazy(() => import('containers/ForgotPassword/ForgotPassword'));
const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));

const routes = [
  {
    path: `${getLoginPath}`,
    exact: true,
    name: 'Login',
    state: 'login',
    component: () => (
      <AuthLayout>
        <Suspense fallback={<AuthSpinner />}>
          <Login />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: `${getRegisterPath}`,
    exact: true,
    name: 'Register',
    state: 'register',
    component: () => (
      <AuthLayout>
        <Suspense fallback={<AuthSpinner />}>
          <Register />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: `${getForgotPasswordPath}`,
    exact: true,
    name: 'Forgot Password',
    state: 'forgotPassword',
    component: () => (
      <AuthLayout>
        <Suspense fallback={<AuthSpinner />}>
          <ForgotPassword />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: `${getDashboardPath}`,
    exact: false,
    name: 'Dashboard',
    state: 'dashboard',
    auth: true,
    component: () => (
      <Suspense fallback={<AuthSpinner />}>
        <Dashboard />
      </Suspense>
    ),
  },
];

export default routes;
