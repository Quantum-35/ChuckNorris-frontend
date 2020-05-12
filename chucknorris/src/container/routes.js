import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Signup';
import PrivateRoute from '../utils/privateRoute';

const Routes = props => {
    return(
        <BrowserRouter>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    );
};

export default Routes;
