/*
* Widget class. Subclass of Product.
*/
let Product = require('./Product.js');

function Widget(id, size, finish, name, type, inStock) {
  Product.call(this, id, name, inStock);
  this.size = size;
  this.finish = finish;
  this.type = type;
}

function whatDoIDo() {
  // nothing perceptible
}

module.exports = Widget;
