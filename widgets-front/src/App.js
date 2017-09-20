import React, { Component } from 'react';
import WidgetTable from './components/WidgetTable.js';
import OrderList from './components/OrderList.js';
import './App.css';

export default class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the "Uber of Widgets" Widget store</h2>
          <h3>Buy something or get out</h3>
          <h4>The only currency we accept is acorns</h4>
        </div>
        <OrderList />
        <WidgetTable />
      </div>
    );
  }
}
