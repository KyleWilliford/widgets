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
    // TODO optimize by making one call instead of n calls
    fetch('/enums/types')
      .then(res => res.json())
      .then(types => { 
        this.setState({ types: types, typeId: types[0].id });
        console.log(this.state.types);
      });
    fetch('/enums/sizes')
      .then(res => res.json())
      .then(sizes => { 
        this.setState({ sizes: sizes, sizeId: sizes[0].id });
        console.log(this.state.sizes);
      });
    fetch('/enums/finishes')
      .then(res => res.json())
      .then(finishes => { 
        this.setState({ finishes: finishes, finishId: finishes[0].id });
        console.log(this.state.finishes);
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
    console.log('A new order was submitted: ' + this.state.value);
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
      name: this.state.value,
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
        <select className="margin=5px" onChange={this.typeChange} value={this.state.typeId}>
          {types.map(type =>
            <option key={type.id} value={type.id}>{type.name}</option>
          )}
        </select>
        <select className="margin=5px" onChange={this.sizeChange} value={this.state.sizeId}>
          {sizes.map(size =>
            <option key={size.id} value={size.id}>{size.name}</option>
          )}
        </select>
        <select className="margin=5px" onChange={this.finishChange} value={this.state.finishId}>
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