import React from 'react';
import '../styles/Widget.css';

export default class WidgetComponent extends React.Component {
  constructor() {
    super()
    this.state = { widgets: [] };
  }

  componentDidMount() {
    fetch('/inventory/widgets')
      .then(res => res.json())
      .then(widgets => this.setState({ widgets }));
  }

  render() {
    const { widgets }  = this.state;
    return (
      <div>
        <h1>All Widgets</h1>
        <div>
          <table className="widget-table">
            <tbody>
              <tr><td>Name</td><td>Size</td><td>Finish</td></tr>
              { widgets.map(widget =>
                <tr key={widget.id}><td>{widget.name}</td><td>{widget.Size.name}</td><td>{widget.Finish.name}</td></tr>
              ) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}