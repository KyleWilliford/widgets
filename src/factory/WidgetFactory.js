let Widget = require('../model/Widget.js');
let WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
let WidgetPrime = require('../model/WidgetPrime.js');
let WidgetElite = require('../model/WidgetElite.js');

function createWidget(id, size, finish, name, type, inStock) {
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
