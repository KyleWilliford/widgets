import React from 'react';

export default class SearchWidgets extends React.Component {
  constructor() {
    super()
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('A value was submitted: ' + this.state.value);
    this.props.search('name', this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search by: 
          <input className="margin-5px" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input className="margin-5px" type="submit" value="Submit" />
      </form>
    );
  }
}