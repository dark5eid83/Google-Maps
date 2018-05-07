import React, { Component } from 'react';
import './style.css';
import Navbar from "../../Navbar/Navbar";


export default class Login extends Component {
    render() {
        return(
            <div className="container-fluid">
                <Navbar/>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form className="form-signin" action="/login" method="post">
                            <h1 className="h3 mb-3 font-weight-normal" align="center">Please sign in</h1>
                            <label  className="sr-only">Enter Username</label>
                            <input type="text" name="username" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
                            <label className="sr-only">Password</label>
                            <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
                            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in <span className="fas fa-sign-in-alt" /> </button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}