import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from 'core/utils';
import { publicRoutes, routes } from 'core/routes';
import { useAuth } from '../../core/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { logout, postLogout, postRefreshToken, selectPostRefreshTokenFetchStatus } from '../../redux/auth/auth.slice';
import { fetchStates } from '../../core/enums/redux.statues';

const MainPage = () => {
  const auth = useAuth();

  const dispatch = useDispatch();
  const refreshTokenFetchStatus = useSelector(selectPostRefreshTokenFetchStatus);

  useEffect(() => {
    if (auth) {
      dispatch(postRefreshToken());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (refreshTokenFetchStatus === fetchStates.REJECTED) {
      dispatch(postLogout());
      dispatch(logout());
    }
  }, [dispatch, refreshTokenFetchStatus]);

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
