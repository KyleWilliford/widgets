import React, { Component } from 'react';
import WidgetComponent from './components/WidgetComponent.js';
import './App.css';

export default class App extends Component {
  state = {users: [], widgets: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    fetch('/inventory/widgets')
      .then(res => res.json())
      .then(widgets => this.setState({ widgets }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the Widget store</h2>
        </div>
        <h1>All Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <h1>All Widgets</h1>
        <table className="widget-table"><tbody>
        <tr><td>Name</td><td>Size</td><td>Finish</td></tr>
        {this.state.widgets.map(widget =>
          <WidgetComponent key={widget.id} Size={widget.Size} Finish={widget.Finish} name={widget.name} />
        )}
        </tbody></table>
      </div>
    );
  }
}
