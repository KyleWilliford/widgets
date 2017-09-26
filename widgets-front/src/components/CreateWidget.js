import React from 'react';

export default class CreateWidget extends React.Component {
  constructor() {
    super()
    this.state = { types: [], sizes: [], finishes: [], value: '', typeId: 1, sizeId: 1, finishId: 1 };

    this.typeChange = this.typeChange.bind(this);
    this.sizeChange = this.sizeChange.bind(this);
    this.finishChange = this.finishChange.bind(this);
    this.textInputChange = this.textInputChange.bind(this);
    this.submitNewWidget = this.submitNewWidget.bind(this);
  }

  componentDidMount() {
    // TODO make one call instead of 3 calls
    fetch('/enums/types')
      .then(res => res.json())
      .then(types => { 
        this.setState({ types: types });
        if (types.length > 0) {
          this.setState({ typeId: types[0].id });
        }
      });
    fetch('/enums/sizes')
      .then(res => res.json())
      .then(sizes => { 
        this.setState({ sizes: sizes });
        if (sizes.length > 0) {
          this.setState({ sizeId: sizes[0].id });
        }
      });
    fetch('/enums/finishes')
      .then(res => res.json())
      .then(finishes => { 
        this.setState({ finishes: finishes });
        if (finishes.length > 0) {
          this.setState({ finishId: finishes[0].id });
        }
      });
  }

  typeChange(event) {
    this.setState({ typeId: parseInt(event.target.value, 10) });
  }

  sizeChange(event) {
    this.setState({ sizeId: parseInt(event.target.value, 10) });
  }

  finishChange(event) {
    this.setState({ finishId: parseInt(event.target.value, 10) });
  }

  textInputChange(event) {
    this.setState({ value: event.target.value });
  }

  submitNewWidget(event) {
    let name = this.state.value.substring(0, 64); // name field is constrained to 64 characters
    if(!name) {
      name = 'Unknown';
    }
    event.preventDefault();
    let selectedType;
    this.state.types.forEach(type => {
      if (type.id === this.state.typeId) {
        selectedType = type;
        return;
      }
    });
    let selectedSize;
    this.state.sizes.forEach(size => {
      if (size.id === this.state.sizeId) {
        selectedSize = size;
        return;
      }
    });
    let selectedFinish;
    this.state.finishes.forEach(finish => {
      if (finish.id === this.state.finishId) {
        selectedFinish = finish;
        return;
      }
    });
    const widget = {
      name: name,
      type: selectedType,
      size: selectedSize,
      finish: selectedFinish
    };
    this.props.newWidget(widget);
  }

  render() {
    const types = this.state.types;
    const sizes = this.state.sizes;
    const finishes = this.state.finishes;
    return (
      <div>
        <div><h4>Create A New Product</h4></div>
        <select className="margin-5px" onChange={this.typeChange} value={this.state.typeId}>
          {types.map(type =>
            <option key={type.id} value={type.id}>{type.name}</option>
          )}
        </select>
        <select className="margin-5px" onChange={this.sizeChange} value={this.state.sizeId}>
          {sizes.map(size =>
            <option key={size.id} value={size.id}>{size.name}</option>
          )}
        </select>
        <select className="margin-5px" onChange={this.finishChange} value={this.state.finishId}>
          {finishes.map(finish =>
            <option key={finish.id} value={finish.id}>{finish.name}</option>
          )}
        </select>
        <form onSubmit={this.submitNewWidget}>
          <label className="margin-5px">
            Name: 
            <input className="margin-5px" type="text" value={this.state.value} onChange={this.textInputChange} />
          </label>
          <input className="margin-5px" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}