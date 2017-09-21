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
var SqlString = require('sqlstring');

/* GET widgets */
router.get('/', function(req, res, next) {
  try {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'appuser',
      password : 'gumshoetoadstool',
      database : 'widgets'
    });
    connection.query(
      `SELECT
        p.id AS productId,
        p.name AS productName,
        s.id AS sizeId,
        s.name AS sizeName,
        f.id AS finishId,
        f.name AS finishName,
        f.hex_code AS finishHexCode
      FROM products p
      JOIN finishes f ON p.finish_id = f.id
      JOIN sizes s ON p.size_id = s.id
      ORDER BY productId DESC;`,
      function (error, results, fields) {
      if (error) throw error;
      let widgets = [];
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName);
        console.log(widget);
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