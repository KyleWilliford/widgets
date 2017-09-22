import React from 'react';

export default class UpdateOrder extends React.Component {
  constructor() {
    super()
    this.updateOrder = this.updateOrder.bind(this);
  }

  updateOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <button value={this.props.orderId} onClick={this.updateOrder}>Update Order</button>
    );
  }
}