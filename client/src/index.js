import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';


const defend = () => {
    if(localStorage.getItem('token') !== null) {
        return true
    } else {
        return false;
    }
};


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" render={() =>(defend() ? (<Dashboard />) : (<Redirect to="/login"/> ))} />
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
