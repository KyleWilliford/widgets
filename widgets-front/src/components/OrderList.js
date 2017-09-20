import React from 'react';

export default class OrderList extends React.Component {
  constructor() {
    super()
    this.state = { orders: [] };
  }

  componentDidMount() {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  }

  render() {
    const { orders }  = this.state;
    return (
      <div className="component-pad">
        <h1>All Orders</h1>
        <div>
          <ul>
            { orders.map(order =>
              <li key={order.id}>{order.id}</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}