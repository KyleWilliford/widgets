import React from 'react';
import '../styles/WidgetTable.css';

export default class WidgetTable extends React.Component {
  constructor() {
    super()
    this.state = { widgets: [] };
  }

  componentDidMount() {
    fetch('/widgets')
      .then(res => res.json())
      .then(widgets => this.setState({ widgets }));
  }

  render() {
    const { widgets }  = this.state;
    return (
      <div className="component-pad">
        <h1>All Widgets</h1>
        <div>
          <table id="widget-table">
            <tbody>
              <tr><td>Name</td><td>Type</td><td>Size</td><td>Finish</td></tr>
              { widgets.map(widget =>
                <tr key={widget.id}><td>{widget.name}</td><td>{widget.type.name}</td><td>{widget.size.name}</td><td>{widget.finish.name}</td></tr>
              ) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}