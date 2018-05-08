import React, { Component } from 'react'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default class Container extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Navbar/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}