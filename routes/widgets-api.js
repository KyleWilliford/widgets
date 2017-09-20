var express = require('express');
var router = express.Router();
var Size = require('../src/models/Size.js');
var Finish = require('../src/models/Finish.js');
var Widget = require('../src/models/Widget.js');
var WidgetExtremeEdition = require('../src/models/WidgetExtremeEdition.js');

/* GET widgets */
router.get('/', function(req, res, next) {
  let widgets = [];
  const small = new Size(1, 'Invisibly Small');
  const large = new Size(2, 'Galactically Huge');
  const green = new Finish(1, 'green', '008000');
  const purple = new Finish(2, 'purple', '800080');
  const widget1 = new Widget(1, small, green, 'Widget Prime');
  widgets.push(widget1);
  const widget2 = new WidgetExtremeEdition(2, large, purple, 'Widget Extreme Edition');
  widgets.push(widget2);
  console.log(widgets);
  res.send(widgets);
  if (next) next();
});

module.exports = router;