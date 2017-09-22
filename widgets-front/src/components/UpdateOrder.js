import React from 'react';

export default class UpdateOrder extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <button onClick={this.props.updateOrder.bind(this, this.props.order)}>Update Order</button>
    );
  }
}