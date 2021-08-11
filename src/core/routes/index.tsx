import React, {lazy} from 'react'
import AuthLayout from '../../layouts/AuthLayout';

// paths
export const getLoginPath = '/login';

// containers
const Login = lazy(() => import("../../containers/Login"));


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
];

export default routes