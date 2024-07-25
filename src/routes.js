import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './private/Dashboard/Dashboard';
//import Orders from './private/Orders/Orders';
import NotFound from './components/Pages/NotFound';
import Settings from './private/Settings/Settings';
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
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>            
                <PrivateRoute path="/settings">
                    <Settings />
                </PrivateRoute>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>                
                {/* <PrivateRoute path="/orders/:symbol?">
                    <Orders />
                </PrivateRoute>

                */}

                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;