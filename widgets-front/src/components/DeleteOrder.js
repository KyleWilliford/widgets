import React from 'react';

export default class DeleteOrder extends React.Component {
  render() {
    return (
      <button className="margin-5px" onClick={this.props.deleteOrder.bind(this, this.props.order)}>Delete Order</button>
    );
  }
}