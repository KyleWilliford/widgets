var Product = require('./Product.js');

function Widget(id, Size, Finish, name) {
  Product.call(this, id, name);
  this.Size = Size;
  this.Finish = Finish;
}

function whatDoIDo() {
  // nothing perceptible
}

module.exports = Widget;