import React from 'react';

export default class WidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.size = props.size;
    this.Finish = props.Finish;
    this.name = props.name;
  }

  render() {
    return <tr><td>{this.name}</td><td>{this.size}</td><td>{this.Finish.name}</td></tr>
  }
}