import React from 'react';
import ViewOrder from './ViewOrder.js';
import DeleteOrder from './DeleteOrder.js';
import UpdateOrder from './UpdateOrder.js';

export default class OrderList extends React.Component {
  constructor() {
    super()
    this.state = { orders: [] };
    this.showOrder = this.showOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }

  componentDidMount() {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  }

  showOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
    this.state.orders.forEach(function(order) {
      if (parseInt(order.id, 10) === parseInt(e.target.value, 10))
      order.products.forEach(function(product) {
        console.log(product);
      });
    });
  }

  updateOrder(order) {
    console.log(order);
    fetch('/orders', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
  }

  deleteOrder(order) {
    console.log(order);
    fetch('/orders', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    .then(res => res.json())
  }

  render() {
    const { orders } = this.state;
    return (
      <div className="component-pad">
        <h1>All Orders</h1>
        <div>
          <ul>
            { orders.map(order =>
              <li key={order.id}>
                <ViewOrder orderId = {order.id} orderDate = {order.orderDate} />
                <UpdateOrder updateOrder = {this.updateOrder} order = {order} />
                <DeleteOrder deleteOrder = {this.deleteOrder} order = {order} />
              </li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}