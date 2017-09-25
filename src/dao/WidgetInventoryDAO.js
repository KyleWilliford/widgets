let Size = require('../model/Size.js');
let Finish = require('../model/Finish.js');
let WidgetType = require('../model/WidgetType.js');
let Widget = require('../model/Widget.js');
let WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
let WidgetPrime = require('../model/WidgetPrime.js');
let WidgetElite = require('../model/WidgetElite.js');
let WidgetFactory = require('../factory/WidgetFactory.js');
let config = require('../config/DatabaseConfiguration');
let mysql = require('mysql');
let SqlString = require('sqlstring');
let Q = require('q');

function getAllWidgets(req, res, next) {
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(
    `SELECT
      p.id AS productId,
      p.name AS productName,
      p.in_stock AS inStock,
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
    ORDER BY productId DESC;`, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, type, result.inStock);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getWidgets)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if (!res.headersSent) res.send(widgets);
    });
}

function createWidget(req, res, next) {
  let widget = req.body;
  console.log(widget);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let sql = 'INSERT INTO product (name, product_type_id, finish_id, size_id) VALUES (' +
      SqlString.escape(widget.name) + ',' +
      SqlString.escape(widget.type.id) + ',' +
      SqlString.escape(widget.finish.id) + ',' +
      SqlString.escape(widget.size.id) + ');';
      console.log(sql);
  function createWidget() {
    let deferred = Q.defer();
    connection.query(sql, function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(createWidget)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if (!res.headersSent) res.send(widget);
    });
}

function getWidgetsBySize(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  let sql = `SELECT
      p.id AS productId,
      p.name AS productName,
      p.in_stock AS inStock,
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
    WHERE s.name = ${name}
    ORDER BY productId ASC;`;
  console.log(sql);
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(sql, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, type, result.inStock);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getWidgets)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if (!res.headersSent) res.send(widgets);
    });
}

function getWidgetsByType(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  let sql = `SELECT
      p.id AS productId,
      p.name AS productName,
      p.in_stock AS inStock,
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
    WHERE t.name = ${name}
    ORDER BY productId ASC;`;
  console.log(sql);
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(sql, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, type, result.inStock);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getWidgets)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if (!res.headersSent) res.send(widgets);
    });
}

function getWidgetsByFinish(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  let sql = `SELECT
      p.id AS productId,
      p.name AS productName,
      p.in_stock AS inStock,
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
    WHERE f.name = ${name}
    ORDER BY productId ASC;`;
  console.log(sql);
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(sql, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, type, result.inStock);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getWidgets)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if (!res.headersSent) res.send(widgets);
    });
}

function getWidgetsByName(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  let sql = `SELECT
      p.id AS productId,
      p.name AS productName,
      p.in_stock AS inStock,
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
    WHERE p.name = ${name}
    ORDER BY productId ASC;`;
  console.log(sql);
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(sql, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, type, result.inStock);
        console.log(widget);
        if (widget) widgets.push(widget);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getWidgets)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if (!res.headersSent) res.send(widgets);
    });
}

function getSupportedSearchTypes(req, res, next) {
  res.send([
    'name', 'size', 'finish', 'type',
  ]);
}

module.exports = {
  getAllWidgets: getAllWidgets,
  createWidget: createWidget,
  getWidgetsBySize: getWidgetsBySize,
  getWidgetsByType: getWidgetsByType,
  getWidgetsByFinish: getWidgetsByFinish,
  getWidgetsByName: getWidgetsByName,
  getSupportedSearchTypes: getSupportedSearchTypes,
};
