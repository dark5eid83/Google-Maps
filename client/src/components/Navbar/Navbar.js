import React, { Component } from 'react';
import Auth from '../../Auth';
import './style.css';

export default class Navbar extends Component {
    renderLoggedIn = (user) => {
        return (<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 site-header">
            <h5 className="my-0 mr-md-auto mt-2 ml-3">Mappr</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <div className="dropdown">
                <a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="fa fa-bell" style="margin-top:10px; color:#b2bbbd; font-size:20px" />
                    {
                        user.alerts.length > 0 && <span className="badge badge-danger" style="border-radius:50%">{user.alerts.length}</span>
                    }
                </a>
                <div className="dropdown-menu dropdown-menu-right alert-dropdown-menu" id="alert-menu" aria-labelledby="dropdownMenuButton">
                <h5 className="dropdown-item">Alerts</h5>
                <hr />
                    {
                        user.alerts.map(alert => {
                            return `<a class="dropdown-item" href="/delete/alert/${alert.id}"><i class="fas fa-eye-slash" />${alert.message}</a>`
                        })
                    }
                </div>
                </div>
                </nav>
                <div className="dropdown mr-4">
                <a className="dropdown-toggle" style="" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img style="border: 1px solid #b2bbbd; padding:4px; border-radius:50%" height="50" width="50" src="<%= user.profile_picture %>" />
                </a>
                <div className="dropdown-menu dropdown-menu-right user-dropdown-menu" aria-labelledby="dropdownMenuButton">
                <h5 className="dropdown-item">Welcome, ${user.username}</h5>
                <hr />
                <a className="dropdown-item" href="/dashboard"><i className="fas fa-chart-line" /> Dashboard</a>
                <a className="dropdown-item" href="/profile"><i className="fas fa-user" /> Profile</a>
                <a className="dropdown-item" href="/logout"><i className="fas fa-sign-out-alt" /> Logout</a>
                </div>
                </div>
        </div>);
    };

    renderLoggedOut = () => {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 site-header">
                <h5 className="my-0 mr-md-auto mt-2 ml-3">Mappr</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <a className="py-2 pr-2 text-light" href="/login">Login</a>
                    <a className="py-2 text-light" href="/signup">Signup</a>
                </nav>
            </div>
        )
    };

    render() {
        if(Auth.isLoggedIn()) {
            Auth.deserialize(localStorage.getItem('token')).then(user => {
                return this.renderLoggedIn(user);
            });
        } else {
            return this.renderLoggedOut()
        }
    }
}