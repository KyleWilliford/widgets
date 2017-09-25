function Order(id, products, orderDate, orderUpdated, status) {
  this.id = id;
  this.products = products || [];
  this.orderDate = orderDate;
  this.orderUpdated = orderUpdated;
  this.status = status;
}

module.exports = Order;
