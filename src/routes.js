import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
//import Dashboard from './private/Dashboard/Dashboard';
//import Orders from './private/Orders/Orders';
import Settings from './private/settings/Settings';
import Home from './public/Home/Home';
import Login from './public/Login/Login';

function Routes() {

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={() => {
                return localStorage.getItem("token")
                    ? children
                    : <Redirect to='/' />
            }} />
        )
    }

    return (
        <BrowserRouter>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/login" exact>
            <Login />
            </Route>            
            <PrivateRoute path="/settings">
                <Settings />
            </PrivateRoute>
            
            {/* <PrivateRoute path="/orders/:symbol?">
                <Orders />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
                <Dashboard />
            </PrivateRoute>
             */}
        </BrowserRouter>
    )
}

export default Routes;