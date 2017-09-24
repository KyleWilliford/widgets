import React from 'react';
import '../styles/WidgetTable.css';
import SearchWidgets from './SearchWidgets.js';

export default class WidgetTable extends React.Component {
  constructor() {
    super()
    this.state = { widgets: [] };
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.refs.searchWidget.setState({ value: '' });
    fetch('/widgets')
      .then(res => res.json())
      .then(widgets => this.setState({ widgets }));
  }

  search(what, value) {
    console.log('search called on: ' + what + ' with value: ' + value);
    fetch('/search/widgets/' + what, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: value})
    })
    .then(res => res.json())
    .then(widgets => this.setState({ widgets }));
  }

  render() {
    const { widgets }  = this.state;
    return (
      <div className="component-pad">
        <h1>Product Inventory</h1>
        <SearchWidgets ref="searchWidget" search = {this.search} />
        <div>
          {widgets.length === 0 ? (
            <h3>
              There are no widgets to display.
            </h3>
          ) : (
            <table id="widget-table">
              <tbody>
                <tr><td>ID</td><td>Name</td><td>Type</td><td>Size</td><td>Finish</td><td>In Stock?</td></tr>
                { widgets.map(widget =>
                  <tr key={widget.id}><td>{widget.id}</td><td>{widget.name}</td><td>{widget.type.name}</td><td>{widget.size.name}</td><td>{widget.finish.name}</td><td>{widget.inStock ? 'Yes' : 'No'}</td></tr>
                ) }
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}