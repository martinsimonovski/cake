import React, { Component } from 'react';
import Login from '../Login/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        This is the main app.
        <Login />
      </div>
    );
  }
}

export default App;
