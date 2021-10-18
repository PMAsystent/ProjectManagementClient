import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'core/hooks';
import { getLoginPath } from 'core/routes';

const PrivateRoute: FC<any> = ({ exact, component, key, path }) => {
  const auth = useAuth();
  return auth ? <Route component={component} path={path} exact={exact} key={key} /> : <Redirect to={getLoginPath} />;
};

export default PrivateRoute;
