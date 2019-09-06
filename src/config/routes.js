import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../components/Register';
import Login from '../components/Login';


const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/register' component={ Register} />
            <Route path='/login' component={ Login } />
        </Switch>
    );
    
};

export default Routes;