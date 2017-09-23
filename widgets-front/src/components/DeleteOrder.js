import React from 'react';

export default class DeleteOrder extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <button onClick={this.props.deleteOrder.bind(this, this.props.order)}>Delete Order</button>
    );
  }
}