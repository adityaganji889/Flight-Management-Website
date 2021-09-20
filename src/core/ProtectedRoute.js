import React from 'react';
import {Route, Redirect} from 'react-router-dom';
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route exact path = {rest.path} component = {rest.component} render={(props) => (
       rest.isLoggedIn === true ? 
          <Component {...props} /> : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
 );
export default ProtectedRoute;