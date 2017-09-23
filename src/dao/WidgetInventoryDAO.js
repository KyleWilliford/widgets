var Size = require('../model/Size.js');
var Finish = require('../model/Finish.js');
var WidgetType = require('../model/WidgetType.js');
var Widget = require('../model/Widget.js');
var WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
var WidgetPrime = require('../model/WidgetPrime.js');
var WidgetElite = require('../model/WidgetElite.js');
var WidgetFactory = require('../factory/WidgetFactory.js');
var config = require('../config/DatabaseConfiguration');
var mysql = require('mysql');
var SqlString = require('sqlstring');
var Q = require('q');

function getAllWidgets(req, res, next) {
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  let widgets = [];
  function getWidgets() {
    var deferred = Q.defer();
    connection.query(
    `SELECT
      p.id AS productId,
      p.name AS productName,
      t.id AS typeId,
      t.name AS typeName,
      s.id AS sizeId,
      s.name AS sizeName,
      f.id AS finishId,
      f.name AS finishName,
      f.hex_code AS finishHexCode
    FROM product p
    INNER JOIN product_type_enum t ON p.product_type_id = t.id
    INNER JOIN finish f ON p.finish_id = f.id
    INNER JOIN size s ON p.size_id = s.id
    ORDER BY productId ASC;`, function(error, results, fields) {
      if (error) throw error;
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, type);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getWidgets)
    .catch(function (error) {
      console.log(error);
    })
    .done(function() {
      res.send(widgets);
    });
}

function createWidget(req, res, next) {
  console.log(req.body);
  var widget = req.body;
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  function createWidget() {
    var deferred = Q.defer();
    connection.query('INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES (' +
      widget.name + ',' +
      widget.type.id + ',' +
      widget.finish.id + ',' +
      widget.size.id + ');'
      , function(error, results, fields) {
      if (error) throw error;
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(createWidget)
    .catch(function (error) {
      console.log(error);
    })
    .done(function() {
      res.send(widget);
    });
}

module.exports = {
  getAllWidgets: getAllWidgets,
  createWidget: createWidget
};