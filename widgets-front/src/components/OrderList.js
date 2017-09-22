import React from 'react';

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
              <li key={order.id}><button value={order.id} onClick={this.showOrder}>Order with id {order.id} placed at {order.orderDate}</button></li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}