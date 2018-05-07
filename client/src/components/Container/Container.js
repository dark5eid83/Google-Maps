import React, { Component } from 'react'

export default class Container extends Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        )
    }
}