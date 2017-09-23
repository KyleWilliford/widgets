var Product = require('./Product.js');

function Widget(id, size, finish, name, type) {
  Product.call(this, id, name);
  this.size = size;
  this.finish = finish;
  this.type = type;
}

function whatDoIDo() {
  // nothing perceptible
}

module.exports = Widget;