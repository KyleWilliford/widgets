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
  }

  render() {
    const { orders }  = this.state;
    return (
      <div className="component-pad">
        <h1>All Orders</h1>
        <div>
          <ul>
            { orders.map(order =>
              <li key={order.id}><button value={order.id} onClick={this.showOrder}>{order.id}</button></li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
}