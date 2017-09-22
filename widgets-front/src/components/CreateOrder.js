import React from 'react';

export default class CreateOrder extends React.Component {
  constructor() {
    super()
    this.createOrder = this.createOrder.bind(this);
  }

  createOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <button onClick={this.createOrder}>Create Order</button>
    );
  }
}