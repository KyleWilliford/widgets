import React from 'react';

export default class UpdateOrder extends React.Component {
  constructor() {
    super()
    this.state = { availableProducts: [], productId: -1, selectedProducts: [] };
    this.update = this.update.bind(this);
    this.productSelectedChange = this.productSelectedChange.bind(this);
    this.addProductToOrder = this.addProductToOrder.bind(this);
    this.removeProductFromOrder = this.removeProductFromOrder.bind(this);
    this.submitUpdatedOrder = this.submitUpdatedOrder.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    fetch('/widgets')
      .then(res => res.json())
      .then(widgets => {
        var availableProducts = widgets.filter(function(widget) {
          return widget.inStock;
        });
        this.setState({ availableProducts : availableProducts });
        if (availableProducts.length > 0) {
          this.setState({ productId: availableProducts[0].id });
        }
      });
  }

  productSelectedChange(event) {
    this.setState({ productId: parseInt(event.target.value, 10) });
  }

  addProductToOrder() {
    const productId = this.state.productId;
    var availableProducts = this.state.availableProducts;
    if (availableProducts.length === 0) return;
    var selectedProducts = this.state.selectedProducts;
    availableProducts.forEach(function(product, index) {
      if (product.id === productId) {
        selectedProducts.push(product);
        availableProducts.splice(index, 1);
        return;
      }
    });
    this.forceUpdate();
    if (availableProducts.length > 0) {
      this.setState({ productId: availableProducts[0].id });
    }
  }

  removeProductFromOrder(productId) {
    var selectedProducts = this.state.selectedProducts;
    if (selectedProducts.length === 0) return;
    var availableProducts = this.state.availableProducts;
    selectedProducts.forEach(function(product, index) {
      if (product.id === productId) {
        availableProducts.push(product);
        selectedProducts.splice(index, 1);
        return;
      }
    });
    this.forceUpdate();
    availableProducts.sort(function(a, b) {
      return b.id - a.id;
    });
  }

  submitUpdatedOrder() {
    this.addProductToOrder();
    let order = this.props.order;
    order.products = order.products.concat(this.state.selectedProducts);
    this.props.sendUpdatedOrder(order);
    this.setState({ selectedProducts: [] });
    this.forceUpdate();
  }

  render() {
    const availableProducts = this.state.availableProducts;
    return (
      <div><h5>Update This Order</h5>
        <span className="margin-5px">Choose a product to add to the order:</span>
        <select className="margin-5px" onChange={this.productSelectedChange} value={this.state.productId}>
          {availableProducts.map(product =>
            <option key={product.id} value={product.id}>id:{product.id} {product.name} {product.size.name} {product.finish.name} {product.type.name}</option>
          )}
        </select>
        <button className="margin-5px" onClick={this.submitUpdatedOrder}>Add To Order</button>
      </div>
    );
  }
}