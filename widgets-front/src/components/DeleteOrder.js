import React from 'react';

export default class DeleteOrder extends React.Component {
  constructor() {
    super()
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  deleteOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <button value={this.props.orderId} onClick={this.deleteOrder}>Delete Order</button>
    );
  }
}