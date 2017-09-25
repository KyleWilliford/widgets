/*
* Product class. Abstract base class.
*/
const Product = function(id, name, inStock) {
  if (this.constructor === Product) {
    throw new Error('Can\'t instantiate this abstract class!');
  }
  this.id = id;
  this.name = name;
  this.inStock = inStock;
};

module.exports = Product;
