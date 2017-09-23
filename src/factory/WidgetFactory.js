var Widget = require('../model/Widget.js');
var WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
var WidgetPrime = require('../model/WidgetPrime.js');
var WidgetElite = require('../model/WidgetElite.js');

function createWidget(id, size, finish, name, type) {
  if (type.name === 'Widget') {
    return new Widget(id, size, finish, name, type);
  } else if (type.name === 'Widget Prime') {
    return new WidgetPrime(id, size, finish, name, type);
  } else if (type.name === 'Widget Elite') {
    return new WidgetElite(id, size, finish, name, type);
  } else if (type.name === 'Widget EXTREME Edition') {
    return new WidgetExtremeEdition(id, size, finish, name, type);
  }
}

module.exports.createWidget = createWidget;