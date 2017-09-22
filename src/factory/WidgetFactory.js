var Widget = require('../model/Widget.js');
var WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
var WidgetPrime = require('../model/WidgetPrime.js');
var WidgetElite = require('../model/WidgetElite.js');

function createWidget(id, Size, Finish, name, typeName) {
  if (typeName === 'Widget') {
    return new Widget(id, Size, Finish, name);
  } else if (typeName === 'Widget Prime') {
    return new WidgetPrime(id, Size, Finish, name);
  } else if (typeName === 'Widget Elite') {
    return new WidgetElite(id, Size, Finish, name);
  } else if (typeName === 'Widget EXTREME Edition') {
    return new WidgetExtremeEdition(id, Size, Finish, name);
  }
}

module.exports.createWidget = createWidget;