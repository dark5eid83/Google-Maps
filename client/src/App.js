import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Auth from './Auth';
import './App.css';
import Footer from "./components/Footer/Footer";
import Container from "./components/Container/Container";


class App extends Component {
    render() {
        return (
            <Container>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <span className="fa fa-location" />
                        <div className="row">
                            <div className="col-md-9">
                                <h1 className="display-4">Google Maps</h1>
                                <p className="lead">Find your next vacation with Google's new maps!</p>
                                <a className="btn btn-primary" href="/signup">Create an Account <span className="fa fa-plus" /></a>
                            </div>
                        <div className="col-md-3">
                            <span className="far fa-compass header-compass" style={{fontSize:150}} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-4">

                </div>
                <div className="col-md-4">

                </div>
                <div className="col-md-4">

                </div>
            </div>
        </Container>
        );
    }
}

export default App;
