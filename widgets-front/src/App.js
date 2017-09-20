import React, { Component } from 'react';
import WidgetComponent from './components/WidgetComponent.js';
import './App.css';

export default class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Widget store</h2>
        </div>
        <WidgetComponent />
      </div>
    );
  }
}
