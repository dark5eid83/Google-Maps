import React, { Component } from 'react';
import Container from "../../Container/Container";

export default class Signup extends Component {
    render() {
        return(
            <Container>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-4">
                        <form action="/signup" method="post">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter Username" />
                                    <small id="emailHelp" className="form-text text-muted">This is the name your recognized as.</small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control"  id="confirm" placeholder="Confirm Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit <span className="fas fa-plus" /> </button>
                        </form>
                    </div>
                </div>
            </Container>
        )
    }
}