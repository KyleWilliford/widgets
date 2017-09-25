/*
* Factory functions for creating widgets.
*/
let Widget = require('../model/Widget.js');
let WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
let WidgetPrime = require('../model/WidgetPrime.js');
let WidgetElite = require('../model/WidgetElite.js');

/**
* Create a widget based on the type name.
* @param {number} id The widget identifier
* @param {object} size A Size object.
* @param {object} finish A Finish object.
* @param {string} name Thr widget name.
* @param {object} type A WidgetType object.
* @param {boolean} inStock True if the widget is in stock.
* @return {object} The constructed Widget object.
*/
function createWidget(id, size, finish, name, type, inStock) {
  // TODO get product type enum values from the database or configuration file
  if (type.name === 'Widget') {
    return new Widget(id, size, finish, name, type, inStock);
  } else if (type.name === 'Widget Prime') {
    return new WidgetPrime(id, size, finish, name, type, inStock);
  } else if (type.name === 'Widget Elite') {
    return new WidgetElite(id, size, finish, name, type, inStock);
  } else if (type.name === 'Widget EXTREME Edition') {
    return new WidgetExtremeEdition(id, size, finish, name, type, inStock);
  }
}

module.exports.createWidget = createWidget;
