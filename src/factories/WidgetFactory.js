var Widget = require('../models/Widget.js');
var WidgetExtremeEdition = require('../models/WidgetExtremeEdition.js');
var WidgetPrime = require('../models/WidgetPrime.js');
var WidgetElite = require('../models/WidgetElite.js');

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