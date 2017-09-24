import React from 'react';

export default class CreateWidget extends React.Component {
  constructor() {
    super()
    this.createWidget = this.createWidget.bind(this);
  }

  createWidget(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <button onClick={this.createWidget}>Create Widget</button>
    );
  }
}