import React, { Component } from 'react';
import './style.css';
import Auth from '../../../Auth';
import Navbar from "../../Navbar/Navbar";
import Container from "../../Container/Container";


export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: null,
            password: null,
        };
    }

    /**
     * Handles updating state based on given forms
     * @param e
     */
    handleUsernameChange = (e) => this.setState({username: e.target.value});
    handlePasswordChange = (e) => this.setState({password: e.target.value});

    /**
     * Handles a form being submitted
     */
    handleFormSubmit = () => {
      Auth.serialize(this.state.username, this.state.password).then(res => {
          // Incorrect username/password
          if(res.user === null) {
              console.log("Incorrect Username or Password!")
          } else {
              console.log("We are good!");
              localStorage.setItem('token', res.token);
              window.location = '/dashboard';
          }
      });
    };

    render() {
        return(
            <Container>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-5">
                        <form className="form-signin">
                            <h1 className="h3 mb-3 font-weight-normal" align="center">Please sign in</h1>
                            <label  className="sr-only">Enter Username</label>
                            <input type="text" onChange={this.handleUsernameChange} id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
                            <label className="sr-only">Password</label>
                            <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
                            <button className="btn btn-lg btn-primary btn-block mt-4" type="button" onClick={this.handleFormSubmit}>Sign in <span className="fas fa-sign-in-alt" /> </button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
                        </form>
                    </div>
                </div>
            </Container>
        )
    }
}