var Size = require('../model/Size.js');
var Finish = require('../model/Finish.js');
var Widget = require('../model/Widget.js');
var WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
var WidgetPrime = require('../model/WidgetPrime.js');
var WidgetElite = require('../model/WidgetElite.js');
var WidgetFactory = require('../factory/WidgetFactory.js');
var config = require('../config/DatabaseConfiguration');
var mysql = require('mysql');

function getAllWidgets(req, res, next) {
  try {
    var connection = mysql.createConnection({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database
    });
    connection.query(
      `SELECT
        p.id AS productId,
        p.name AS productName,
        s.id AS sizeId,
        s.name AS sizeName,
        f.id AS finishId,
        f.name AS finishName,
        i.stock,
        f.hex_code AS finishHexCode
      FROM inventory i
      INNER JOIN product p ON i.product_id = p.id
      INNER JOIN finish f ON p.finish_id = f.id
      INNER JOIN size s ON p.size_id = s.id
      ORDER BY stock DESC;`,
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
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, result.stock);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      res.send(widgets);
    });
  } catch(error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  getAllWidgets: getAllWidgets
};