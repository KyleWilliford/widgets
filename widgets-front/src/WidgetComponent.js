import React from 'react';

export default class WidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.Size = props.Size;
    this.Finish = props.Finish;
    this.name = props.name;
  }

  render() {
    return <tr><td>{this.name}</td><td>{this.Size.name}</td><td>{this.Finish.name}</td></tr>
  }
}