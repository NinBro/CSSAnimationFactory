import React from 'react';
import Sidebar from './components/Sidebar';
import DatePicker from './components/DatePicker';
import './App.scss';

export default class App extends React.Component {

  render () {
    return (
      <div className="App">
        <Sidebar />
        <DatePicker />
      </div>
    );
  }
}