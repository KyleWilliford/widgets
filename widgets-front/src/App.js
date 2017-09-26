import React, {Component} from 'react';
import WidgetTable from './components/WidgetTable.js';
import OrderList from './components/OrderList.js';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.ordersChanged = this.ordersChanged.bind(this);
    this.widgetsChanged = this.widgetsChanged.bind(this);
  }

  componentDidMount() {
  }

  ordersChanged() {
    this.refs.widgetTable.update();
  }

  widgetsChanged() {
    this.refs.orderList.update();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to... some place that sells Widgets</h2>
        </div>
        <div className="pad-left">
          <div>
            <OrderList ref="orderList" ordersChanged = {this.ordersChanged} />
          </div>
          <div id="widgetTable">
            <WidgetTable ref="widgetTable" widgetsChanged = {this.widgetsChanged} />
          </div>
        </div>
      </div>
    );
  }
}
