/*
* WidgetElite class. Subclass of Widget.
*/
let Widget = require('./Widget.js');

/**
* Constructor function that builds a WidgetElite object of subtype Widget.
* @param {number} id The widget identifier
* @param {object} size A Size object.
* @param {object} finish A Finish object.
* @param {string} name The widget name.
* @param {object} type A WidgetType object.
* @param {boolean} inStock True if the widget is in stock.
*/
function WidgetElite(id, size, finish, name, type, inStock) {
  Widget.call(this, id, size, finish, name, type, inStock);
}

module.exports = WidgetElite;
