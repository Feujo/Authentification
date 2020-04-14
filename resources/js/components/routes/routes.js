import React from 'react';
import SiteLayout from "../site/SiteLayout";
import IndexSite from '../site/IndexSite';
import { BrowserRouter, Switch } from 'react-router-dom';
import AppRoute from './AppRoute';
import Login from '../auth/Login';
import Dashboard from '../core/Dashboard';
import Register from '../auth/Register';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AppRoute
                    exact
                    path="/"
                    layout={SiteLayout}
                    component={IndexSite}
                />
                <AppRoute
                    exact
                    path="/login"
                    layout={SiteLayout}
                    component={Login}
                />
                <AppRoute
                    exact
                    path="/register"
                    layout={SiteLayout}
                    component={Register}
                />
                <AppRoute
                    exact
                    path="/dashboard"
                    layout={SiteLayout}
                    component={Dashboard}
                />
            </Switch>
        </BrowserRouter>
    );
}
export default Routes;