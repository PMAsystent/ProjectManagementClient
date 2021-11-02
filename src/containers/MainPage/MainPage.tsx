import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from 'core/utils';
import { publicRoutes, routes } from 'core/routes';
import { useAuth } from '../../core/hooks';

const MainPage = () => {
  const auth = useAuth();

  return (
    <>
      <Router history={history}>
        <Switch>
          {auth
            ? routes.map((route) => {
                const { exact, component, state, path } = route;
                return <Route component={component} path={path} exact={exact} key={state} />;
              })
            : publicRoutes.map((route) => {
                const { exact, component, state, path } = route;
                return <Route component={component} path={path} exact={exact} key={state} />;
              })}
        </Switch>
      </Router>
    </>
  );
};

export default MainPage;
