import React,  { Component } from 'react';
import './style.css';

export default class List extends Component {
  componentDidMount() {
      console.log(this.props.items);
  }

  render() {
      return (
          <div>
             <ul className="list-group">
                 {
                   this.props.items.map(item => {
                       return <li className="list-group-item"><span className="fas fa-compass" />{item}</li>
                   })
                 }
             </ul>
          </div>
      )
  }
};