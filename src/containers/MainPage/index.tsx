import React from 'react'
import {Switch, Route, Router} from 'react-router-dom';
import { history } from '../../core/utils';
import routes from '../../core/routes';

const MainPage = () => {
    return (
        <>
            <Router history={history}>
                <Switch>
                    {routes.map(route => {
                        const {exact, component, state, path} = route;
                        return <Route component={component} path={path} exact={exact} key={state} />
                    })}
                </Switch>
            </Router>
        </>
    )
}

export default MainPage;