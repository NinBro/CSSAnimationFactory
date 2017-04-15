import React, { Component } from 'react';
import logo from './logo.svg';
import Sidebar from './components/Sidebar';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
      </div>
    );
  }
}

export default App;
