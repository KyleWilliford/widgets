var express = require('express');
var router = express.Router();
var Size = require('../src/models/Size.js');
var Finish = require('../src/models/Finish.js');
var Widget = require('../src/models/Widget.js');
var WidgetExtremeEdition = require('../src/models/WidgetExtremeEdition.js');
var WidgetPrime = require('../src/models/WidgetPrime.js');
var WidgetElite = require('../src/models/WidgetElite.js');
var WidgetFactory = require('../src/factories/WidgetFactory.js');
var mysql = require('mysql');

/* GET widgets */
router.get('/', function(req, res, next) {
  try {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'appuser',
      password : 'gumshoetoadstool',
      database : 'widgets'
    });
    connection.query('SELECT * FROM products;', function (error, results, fields) {
      if (error) throw error;
      let widgets = [];
      results.forEach(function(result) {
        const widget = WidgetFactory.createWidget(result.id, result.size_id, result.finish_id, result.name);
        if (widget) widgets.push(widget);
      });
      res.send(widgets);
    });
  } catch(error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;