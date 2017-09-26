import React from 'react';

/*
* Component that is used to delete an entire order.
*/
export default class DeleteOrder extends React.Component {
  render() {
    return (
      <button className="margin-5px" onClick={this.props.deleteOrder.bind(this, this.props.order)}>Delete Order</button>
    );
  }
}
