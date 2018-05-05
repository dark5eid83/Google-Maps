import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List/List';

class App extends Component {
  constructor() {
      super();
      
      this.state = {
        input: '',
        items: []
      }
  }

  handleInputChange = (e) => {
    this.setState({input: e.target.value});
  };

  handleButtonClick = () => {
      let { items } = this.state;
      items.push(this.state.input);
      this.setState({items});
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <List items={this.state.items}  />
                </div>
                <div className="col-md-4">
                    <input type="text" onChange={this.handleInputChange} className="form-control" placeholder="Where do you want to go" />
                    <button type="button" className="btn btn-primary" onClick={this.handleButtonClick}>Add to List</button>
                </div>    
            </div>
            
        </p>
      </div>
    );
  }
}

export default App;
