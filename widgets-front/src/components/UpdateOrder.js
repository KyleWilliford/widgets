import React from 'react';

export default class UpdateOrder extends React.Component {
  render() {
    return (
      <button className="button-margin" onClick={this.props.updateOrder.bind(this, this.props.order)}>Update Order</button>
    );
  }
}