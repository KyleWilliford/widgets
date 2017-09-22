import React, { Component } from 'react';
import WidgetTable from './components/WidgetTable.js';
import OrderList from './components/OrderList.js';
import CreateOrder from './components/CreateOrder.js';
import './App.css';

export default class App extends Component {

  componentDidMount() {
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
            <OrderList />
          </div>
          <div>
            <CreateOrder />
          </div>
          <div id="widgetTable">
            <WidgetTable />
          </div>
        </div>
      </div>
    );
  }
}
