import React from 'react';

/*
* Component to update a current order.
*/
export default class UpdateOrder extends React.Component {
  constructor() {
    super();
    this.state = {availableProducts: [], productId: -1, selectedProducts: []};
    this.update = this.update.bind(this);
    this.productSelectedChange = this.productSelectedChange.bind(this);
    this.addProductToOrder = this.addProductToOrder.bind(this);
    this.submitUpdatedOrder = this.submitUpdatedOrder.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  /*
  * Update the list of available products to choose from.
  */
  update() {
    this.setState({availableProducts: this.props.products,
      productId: this.props.products[0] ? this.props.products[0].id : -1});
  }

  /*
  * Change handler when a different product is selected from the list.
  */
  productSelectedChange(event) {
    this.setState({productId: parseInt(event.target.value, 10)});
  }

  /*
  * Select a product from the list of available products, and add it to a list of selected products.
  */
  addProductToOrder() {
    const productId = this.state.productId;
    let availableProducts = this.state.availableProducts;
    if (availableProducts.length === 0) return;
    let selectedProducts = this.state.selectedProducts;
    availableProducts.forEach(function(product, index) {
      if (product.id === productId) {
        selectedProducts.push(product);
        availableProducts.splice(index, 1);
        return;
      }
    });
    this.forceUpdate();
    if (availableProducts.length > 0) {
      this.setState({productId: availableProducts[0].id});
    }
  }

  /*
  * Submit button handler for adding a product to an existing order.
  */
  submitUpdatedOrder() {
    this.addProductToOrder();
    let order = this.props.order;
    order.products = order.products.concat(this.state.selectedProducts);
    this.props.sendUpdatedOrder(order);
    this.setState({selectedProducts: []});
    this.forceUpdate();
  }

  render() {
    const availableProducts = this.state.availableProducts;
    return (
      <div><h5>Update This Order</h5>
        <span className="margin-5px">Choose a product to add to the order:</span>
        <select className="margin-5px" onChange={this.productSelectedChange} value={this.state.productId}>
          {availableProducts.map((product) =>
            <option key={product.id} value={product.id}>id:{product.id} {product.name} {product.size.name} {product.finish.name} {product.type.name}</option>
          )}
        </select>
        <button className="margin-5px" onClick={this.submitUpdatedOrder}>Add To Order</button>
      </div>
    );
  }
}
