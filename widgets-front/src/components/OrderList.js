import React from 'react';
import ViewOrder from './ViewOrder.js';
import DeleteOrder from './DeleteOrder.js';
import UpdateOrder from './UpdateOrder.js';

export default class OrderList extends React.Component {
  constructor() {
    super()
    this.state = { orders: [] };
    this.showOrder = this.showOrder.bind(this);
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

  render() {
    const { orders } = this.state;
    console.log(orders);
    return (
      <div className="component-pad">
        <h1>All Orders</h1>
        <div>
          <ul>
            { orders.map(order =>
              <li key={order.id}>
                <ViewOrder orderId={order.id} orderDate={order.orderDate} />
                <UpdateOrder orderId={order.id} />
                <DeleteOrder orderId={order.id} />
              </li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}