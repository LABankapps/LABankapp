import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute } from './';

import { Account } from '../modules/Account'
import { Engine } from '../modules/Engine/'
import { Dashboard } from '../modules/Dashboard/index';
import { Login } from '../modules/Login';
import { Register } from '../modules/Register';
import { EnginesAdmin, UsersAdmin, RecordsAdmin } from '../modules/Admin/index';
import { Error } from '../modules/Error';

const Router = () => (
  <Switch >
    <PrivateRoute exact path='/' component={Dashboard}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/register' component={Register}/>
    <PrivateRoute path='/engine' component={Engine}/>
    <PrivateRoute path='/account' component={Account}/>
    <PrivateRoute path='/admin/users' isAdmin={true} component={UsersAdmin}/>
    <PrivateRoute path='/admin/engines' isAdmin={true} component={EnginesAdmin}/>
    <PrivateRoute path='/admin/records' isAdmin={true} component={RecordsAdmin}/>
    <Route render={(props)=><Error {...props}/>}/>
  </Switch>
);

export { Router };
