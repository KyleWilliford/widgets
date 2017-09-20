import React from 'react';

export default class WidgetComponent extends React.Component {

  render() {
    return <tr><td>{this.props.name}</td><td>{this.props.Size.name}</td><td>{this.props.Finish.name}</td></tr>
  }
}