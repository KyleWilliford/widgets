import React from 'react';

export default class CreateOrder extends React.Component {
  constructor() {
    super()
    this.state = { availableProducts: [], productId: -1, selectedProducts: [] };
    this.update = this.update.bind(this);
    this.productSelectedChange = this.productSelectedChange.bind(this);
    this.addProductToOrder = this.addProductToOrder.bind(this);
    this.removeProductFromOrder = this.removeProductFromOrder.bind(this);
    this.submitNewOrder = this.submitNewOrder.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    console.log('update CreateOrder called');
    fetch('/widgets')
      .then(res => res.json())
      .then(widgets => {
        var availableProducts = widgets.filter(function(widget) {
          return widget.inStock;
        });
        console.log(availableProducts);
        this.setState({ availableProducts : availableProducts });
        if (availableProducts.length > 0) {
          this.setState({ productId: availableProducts[0].id });
        }
      });
  }

  productSelectedChange(event) {
    console.log('Product with id ' + event.target.value + ' selected.');
    this.setState({ productId: parseInt(event.target.value, 10) });
  }

  addProductToOrder() {
    const productId = this.state.productId;
    console.log('Product with id ' + productId + ' add to order.');
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
    console.log(availableProducts);
    console.log(selectedProducts);
    this.forceUpdate();
    if (availableProducts.length > 0) {
      this.setState({ productId: availableProducts[0].id });
    }
  }

  removeProductFromOrder(productId) {
    console.log('Product with id ' + productId + ' remove from order.');
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
    console.log(availableProducts);
    console.log(selectedProducts);
    this.forceUpdate();
    availableProducts.sort(function(a, b) {
      return b.id - a.id;
    });
  }

  submitNewOrder() {
    const order = {
      products: this.state.selectedProducts
    };
    this.props.sendOrder(order);
    this.setState({ selectedProducts: [] });
    this.forceUpdate();
  }

  render() {
    const availableProducts = this.state.availableProducts;
    const selectedProducts = this.state.selectedProducts;
    return (
      <div><h4>Create A New Order</h4>
        <span className="margin-5px">Choose a product to add to the order:</span>
        <select className="margin=5px" onChange={this.productSelectedChange} value={this.state.productId}>
          {availableProducts.map(product =>
            <option key={product.id} value={product.id}>id:{product.id} {product.name} {product.size.name} {product.finish.name} {product.type.name}</option>
          )}
        </select>
        <button className="margin-5px" onClick={this.addProductToOrder}>Add To Order</button>
        <div>
          {selectedProducts.length !== 0 && 
            <div>
              <table id="new-order-table">
                <tbody>
                  <tr><td>ID</td><td>Name</td><td>Type</td><td>Size</td><td>Finish</td><td>Remove?</td></tr>
                  {selectedProducts.map(product =>
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.type.name}</td>
                      <td>{product.size.name}</td>
                      <td>{product.finish.name}</td>
                      <td><button onClick={this.removeProductFromOrder.bind(this, product.id)}>Remove</button></td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="margin-5px" onClick={this.submitNewOrder}>Finalize Order</button>
            </div>
          }
        </div>
      </div>
    );
  }
}