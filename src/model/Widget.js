/*
* Widget class. Subclass of Product.
*/
let Product = require('./Product.js');

/**
* Constructor function that builds a Widget object of subtype Product.
* @param {number} id The widget identifier
* @param {object} size A Size object.
* @param {object} finish A Finish object.
* @param {string} name The widget name.
* @param {object} type A WidgetType object.
* @param {boolean} inStock True if the widget is in stock.
*/
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
