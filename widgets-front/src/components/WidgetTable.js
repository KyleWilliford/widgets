import React from 'react';
import '../styles/WidgetTable.css';
import SearchWidgets from './SearchWidgets.js';
import CreateWidget from './CreateWidget.js';

/*
* Component that will display all widget inventory, and a CreateWidget component and a SearchWidgets component.
*/
export default class WidgetTable extends React.Component {
  constructor() {
    super();
    this.state = {widgets: []};
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
    this.newWidget = this.newWidget.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  /*
  * Update the table of widgets.
  */
  update() {
    this.refs.searchWidget.setState({value: ''});
    fetch('/widgets')
      .then((res) => res.json())
      .then((widgets) => this.setState({widgets}));
  }

  /*
  * Call the backend to search for widgets by some parameterized criteria (size, type finish, name, etc.).
  */
  search(what, value) {
    if (!value) {
      fetch('/widgets')
      .then((res) => res.json())
      .then((widgets) => this.setState({widgets}));
    } else {
      fetch('/search/widgets/' + what, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: value}),
      })
      .then((res) => res.json())
      .then((widgets) => this.setState({widgets}));
    }
  }

  /*
  * Call the backend to submit a new widget to add to the database.
  */
  newWidget(widget) {
    fetch('/widgets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widget),
    })
    .then((response) => this.update())
    .then((response) => this.props.widgetsChanged());
  }

  render() {
    const {widgets} = this.state;
    return (
      <div className="component-pad">
        <h1>Product Inventory</h1>
        <div>
          <CreateWidget newWidget = {this.newWidget} />
        </div>
        <h4>Products Listing</h4>
        <SearchWidgets ref="searchWidget" search = {this.search} />
        <div>
          {widgets.length === 0 ? (
            <h3>
              There are no widgets to display.
            </h3>
          ) : (
            <table id="widget-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Type</th><th>Size</th><th>Finish</th><th>In Stock?</th></tr>
              </thead>
              <tbody>
                { widgets.map((widget) =>
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
