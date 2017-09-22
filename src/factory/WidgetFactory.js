var Widget = require('../model/Widget.js');
var WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
var WidgetPrime = require('../model/WidgetPrime.js');
var WidgetElite = require('../model/WidgetElite.js');

function createWidget(id, Size, Finish, name, stock) {
  if (name === 'Widget') {
    return new Widget(id, Size, Finish, name, stock);
  } else if (name === 'Widget Prime') {
    return new WidgetPrime(id, Size, Finish, name, stock);
  } else if (name === 'Widget Elite') {
    return new WidgetElite(id, Size, Finish, name, stock);
  } else if (name === 'Widget EXTREME Edition') {
    return new WidgetExtremeEdition(id, Size, Finish, name, stock);
  }
}

module.exports.createWidget = createWidget;