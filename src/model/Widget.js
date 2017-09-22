var Product = require('./Product.js');

function Widget(id, Size, Finish, name, stock) {
  Product.call(this, id, name, stock);
  this.Size = Size;
  this.Finish = Finish;
}

function whatDoIDo() {
  // nothing perceptible
}

module.exports = Widget;