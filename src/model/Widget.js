var Product = require('./Product.js');

function Widget(id, Size, Finish, name, typeName) {
  Product.call(this, id, name);
  this.Size = Size;
  this.Finish = Finish;
  this.typeName = typeName;
}

function whatDoIDo() {
  // nothing perceptible
}

module.exports = Widget;