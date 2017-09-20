var express = require('express');
var router = express.Router();
var Size = require('../src/models/Size.js');
var Finish = require('../src/models/Finish.js');
var Widget = require('../src/models/Widget.js');
var WidgetExtremeEdition = require('../src/models/WidgetExtremeEdition.js');
var WidgetPrime = require('../src/models/WidgetPrime.js');
var WidgetElite = require('../src/models/WidgetElite.js');

/* GET widgets */
router.get('/', function(req, res, next) {
  let widgets = [];
  const small = new Size(1, 'Invisibly Small');
  const medium = new Size(2, 'Medium');
  const large = new Size(3, 'Galactically Huge');
  const green = new Finish(1, 'green', '008000');
  const purple = new Finish(2, 'purple', '800080');
  const widget1 = new WidgetPrime(1, small, green, WidgetPrime.name);
  widgets.push(widget1);
  const widget2 = new WidgetExtremeEdition(2, large, purple, WidgetExtremeEdition.name);
  widgets.push(widget2);
  const widget3 = new Widget(3, medium, purple, Widget.name);
  widgets.push(widget3);
  const widget4 = new WidgetElite(4, medium, green, WidgetElite.name);
  widgets.push(widget4);
  console.log(widgets);
  res.send(widgets);
});

module.exports = router;