import React from 'react';
import DeleteOrder from './DeleteOrder.js';
import CreateOrder from './CreateOrder.js';
import UpdateOrder from './UpdateOrder.js';
import '../styles/OrderList.css';

export default class OrderList extends React.Component {
  constructor() {
    super()
    this.state = { orders: [] };
    this.update = this.update.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.deleteProductFromOrder = this.deleteProductFromOrder.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.sendUpdatedOrder = this.sendUpdatedOrder.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
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
        .then(response => this.forceUpdate())
        .then(response => this.refs.createOrderRef.update())
        .then(response => {
          Object.keys(this.refs).forEach(updateOrderRef => {
            if(updateOrderRef !== 'self') {
            this.refs[updateOrderRef].update();
             }
          });
        });
    });
  }

  deleteProductFromOrder(orderId, productId) {
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
        .then(response => this.forceUpdate())
        .then(response => this.refs.createOrderRef.update())
        .then(response => {
          Object.keys(this.refs).forEach(updateOrderRef => {
            if(updateOrderRef !== 'self') {
            this.refs[updateOrderRef].update();
             }
          });
        });
    });
  }

  sendOrder(order) {
    fetch('/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    .then(response => this.update())
    .then(response => {
      Object.keys(this.refs).forEach(updateOrderRef => {
        if(updateOrderRef !== 'self') {
        this.refs[updateOrderRef].update();
         }
      });
    });
  }

  sendUpdatedOrder(order) {
    fetch('/orders', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order)
    })
    .then(response => this.refs.createOrderRef.update())
    .then(response => this.update())
    .then(response => {
      Object.keys(this.refs).forEach(updateOrderRef => {
        if(updateOrderRef !== 'self') {
        this.refs[updateOrderRef].update();
         }
      });
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <div className="component-pad">
        <h1>Product Orders</h1>
        <div>
          <CreateOrder ref="createOrderRef" sendOrder = {this.sendOrder} />
        </div>
        <h2>Existing Orders</h2>
        <div>
          {orders.length === 0 ? (
            <h3>
              There are no current orders to display.
            </h3>
          ) : (
            <ul>
              {orders.map(order =>
                <li key={order.id}>
                  <span>Order with id {order.id} placed at {order.orderDate}</span>
                  <DeleteOrder deleteOrder = {this.deleteOrder} order = {order} />
                  <h5>Products In This Order</h5>
                    {order.products.length === 0 ? (
                      <h6>
                        There are no products to display for this order.
                      </h6>
                    ) : (
                      <div>
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
                                <td><button onClick={this.deleteProductFromOrder.bind(this, order.id, product.id)}>Remove</button></td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <UpdateOrder ref={"updateOrderRef" + order.id} key={order.id} sendUpdatedOrder = {this.sendUpdatedOrder} order = {order} />
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