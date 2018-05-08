import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Components Import
import App from './App';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Signup from './components/pages/Signup/Signup';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


const defend = () => localStorage.getItem('token') !== null;

const logout = () => {
    localStorage.removeItem('token');
    return <Redirect to="/" />
};

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/logout" render={() => defend() ? logout() : <Login/>} />
            <Route exact path="/login" render={() => defend() ? <Dashboard/> : <Login/> } />
            <Route exact path="/signup" render={() => defend() ? <Dashboard/>: <Signup /> } />
            <Route exact path="/dashboard" render={() =>defend() ? <Dashboard /> : <Redirect to="/login" />} />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
