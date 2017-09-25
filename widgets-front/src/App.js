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
          <h2>Welcome to... some place that sells Widgets</h2>
          <h4>We apologize about the poor presentation of this site. We are hard at work hiring men with shovels to fill in the holes.</h4>
        </div>
        <div className="pad-left">
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
