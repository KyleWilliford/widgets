import React, { Component } from 'react';
import WidgetTable from './components/WidgetTable.js';
import OrderList from './components/OrderList.js';
import './App.css';

export default class App extends Component {
  constructor() {
    super()
    this.ordersChanged = this.ordersChanged.bind(this);
  }

  componentDidMount() {
  }

  ordersChanged() {
    this.refs.widgetTable.update();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the "Uber of Widgets" Widget Store</h2>
          <h3>Created By: <a href="https://github.com/KyleWilliford">Kyle Williford</a></h3>
        </div>
        <div  className="pad-left">
          <div>
            <OrderList ordersChanged = {this.ordersChanged} />
          </div>
          <div id="widgetTable">
            <WidgetTable ref="widgetTable" />
          </div>
        </div>
      </div>
    );
  }
}
