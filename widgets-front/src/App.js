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
        </div>
        <div id="orderList">
          <OrderList />
        </div>
        <div id="widgetTable">
          <WidgetTable />
        </div>
      </div>
    );
  }
}
