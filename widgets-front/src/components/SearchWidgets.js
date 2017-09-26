import React from 'react';

/*
* Component that can be used to search for widgets.
*/
export default class SearchWidgets extends React.Component {
  constructor() {
    super();
    this.state = {searchTypes: [], selectedSearchType: '', value: ''};

    this.selectedSearchTypeChange = this.selectedSearchTypeChange.bind(this);
    this.textInputChange = this.textInputChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount() {
    fetch('/supported-search-types')
      .then((res) => res.json())
      .then((searchTypes) => this.setState({searchTypes, selectedSearchType: searchTypes[0]}));
  }

  /*
  * Change handler when a different option is selected from the search type list.
  */
  selectedSearchTypeChange(event) {
    this.setState({selectedSearchType: event.target.value});
  }

  /*
  * Change handler when a input is entered in the text input field.
  */
  textInputChange(event) {
    this.setState({value: event.target.value});
  }

  /*
  * Submit button change handler. Submit a search request with the selected search type.
  */
  submitSearch(event) {
    event.preventDefault();
    this.props.search(this.state.selectedSearchType, this.state.value);
  }

  render() {
    const searchTypes = this.state.searchTypes;
    return (
      <form onSubmit={this.submitSearch}>
        <label>
          Search by:
          <select className="margin-5px" onChange={this.selectedSearchTypeChange} value={this.state.selectedSearchType}>
            {searchTypes.map((searchType, index) =>
              <option key={index} value={searchType}>{searchType}</option>
            )}
          </select>
          <input className="margin-5px" type="text" value={this.state.value} onChange={this.textInputChange} />
        </label>
        <input className="margin-5px" type="submit" value="Submit" />
      </form>
    );
  }
}
