import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Auth from './Auth';
import './App.css';


class App extends Component {
  constructor() {
      super();
      
      this.state = {

      }
  }

  render() {
    return (
      <div>
        <Navbar/>
      </div>
    );
  }
}

export default App;
