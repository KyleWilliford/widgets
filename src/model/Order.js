function Order(id, products, orderDate, orderUpdated) {
  this.id = id;
  this.products = products || [];
  this.orderDate = orderDate;
  this.orderUpdated = orderUpdated;
}

module.exports = Order;