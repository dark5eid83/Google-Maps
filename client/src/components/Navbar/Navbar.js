import React, { Component } from 'react';
import Auth from '../../Auth';
import './style.css';

export default class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            session: true,
            user: null
        }
    }


    componentDidMount = async () => {
        if(Auth.isLoggedIn()) {
            let response =  await Auth.deserialize(localStorage.getItem('token'));
            console.log(response);
            this.setState({user: response.user});
        }
    };

    renderLoggedIn() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 site-header">
                <h5 className="my-0 mr-md-auto mt-2 ml-3">Mappr</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <div className="dropdown">
                        <a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="fa fa-bell mt-2" style={{color:'#b2bbbd', fontSize:'20px'}} />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right alert-dropdown-menu" id="alert-menu" aria-labelledby="dropdownMenuButton">
                            <h5 className="dropdown-item">Alerts</h5>
                            <hr />
                        </div>
                    </div>
                </nav>
                <div className="dropdown mr-4">
                    <a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img style={{border: '1px solid #b2bbbd', padding:'4px', borderRadius:'50%'}} height="50" width="50" src={this.state.user.profile_picture} />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right user-dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <h5 className="dropdown-item">Welcome, {this.state.user.username}</h5>
                        <hr />
                        <a className="dropdown-item" href="/dashboard"><i className="fas fa-chart-line" /> Dashboard</a>
                        <a className="dropdown-item" href="/profile"><i className="fas fa-user" /> Profile</a>
                        <a className="dropdown-item" href="/logout"><i className="fas fa-sign-out-alt" /> Logout</a>
                    </div>
                </div>
            </div>
        );
    };

    static renderLoggedOut() {
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
        return this.state.user !== null ? this.renderLoggedIn() : Navbar.renderLoggedOut();
    }
}