var express = require('express');
var router = express.Router();
var Finish = require('../src/models/Finish.js');
var Widget = require('../src/models/Widget.js');
var WidgetExtremeEdition = require('../src/models/WidgetExtremeEdition.js');

/* GET widgets */
router.get('/', function(req, res, next) {
  let widgets = [];
  const greenFinish = new Finish(1, 'green', '008000');
  const purpleFinish = new Finish(1, 'purple', '800080');
  const widget1 = new Widget(1, 'small', greenFinish, 'Widget Prime');
  widgets.push(widget1);
  const widget2 = new WidgetExtremeEdition(2, 'large', purpleFinish, 'Widget Extreme Edition');
  widgets.push(widget2);
  console.log(widgets);
  res.send(widgets);
});

module.exports = router;