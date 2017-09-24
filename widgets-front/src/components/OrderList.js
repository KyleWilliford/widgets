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
    this.deleteProductFromOrder = this.deleteProductFromOrder.bind(this);
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

  deleteProductFromOrder(orderId, productId) {
    console.log('Remove product with id ' + productId + ' from order with id ' + orderId);
    fetch('/order/product', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: orderId, productId: productId })
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
                  <h5>Products In This Order</h5>
                    {order.products.length === 0 ? (
                      <h6>
                        There are no products to display for this order.
                      </h6>
                    ) : (
                      <table id="orders-table">
                        <tbody>
                          <tr><td>ID</td><td>Name</td><td>Type</td><td>Size</td><td>Finish</td><td>Remove?</td></tr>
                          {order.products.map(product =>
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>{product.type.name}</td>
                              <td>{product.size.name}</td>
                              <td>{product.finish.name}</td>
                              <td><button value={product.id} onClick={this.deleteProductFromOrder.bind(this, order.id, product.id)}>Remove</button></td></tr>
                          )}
                        </tbody>
                      </table>
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