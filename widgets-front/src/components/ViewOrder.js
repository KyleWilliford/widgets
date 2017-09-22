import React from 'react';

export default class ViewOrder extends React.Component {
  constructor() {
    super()
    this.showOrder = this.showOrder.bind(this);
  }

  showOrder(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <button value={this.props.orderId} onClick={this.showOrder}>Order with id {this.props.orderId} placed at {this.props.orderDate}</button>
    );
  }
}