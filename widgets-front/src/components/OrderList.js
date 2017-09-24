import React from 'react';
import DeleteOrder from './DeleteOrder.js';
import UpdateOrder from './UpdateOrder.js';
import CreateOrder from './CreateOrder.js';
import '../styles/OrderList.css';

export default class OrderList extends React.Component {
  constructor() {
    super()
    this.state = { orders: [] };
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  componentDidMount() {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
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
    .then(response => {
      fetch('/orders')
        .then(res => res.json())
        .then(orders => this.setState({ orders }))
        .then(response => this.props.ordersChanged())
    });
  }

  deleteOrder(order) {
    fetch('/orders', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    .then(response => {
      fetch('/orders')
        .then(res => res.json())
        .then(orders => this.setState({ orders }))
        .then(response => this.props.ordersChanged())
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <div className="component-pad">
        <h1>Product Orders</h1>
        <div>
          {orders.length === 0 ? (
            <h3>
              There are no orders to display.
            </h3>
          ) : (
            <ul>
              {orders.map(order =>
                <li key={order.id}>
                  <span>Order with id {order.id} placed at {order.orderDate}</span>
                  <UpdateOrder updateOrder = {this.updateOrder} order = {order} />
                  <DeleteOrder deleteOrder = {this.deleteOrder} order = {order} />
                  {order.products.map(product =>
                    <div key={product.id}>
                      <span>id: {product.id} name: {product.name}</span>
                    </div>
                  )}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
}