/*
* DAO functions for working with widget relations.
*/
let Size = require('../model/Size.js');
let Finish = require('../model/Finish.js');
let WidgetType = require('../model/WidgetType.js');
let WidgetFactory = require('../factory/WidgetFactory.js');
let config = require('../config/DatabaseConfiguration');
let mysql = require('mysql');
let SqlString = require('sqlstring');
let Q = require('q');

/**
* GET all widget products and return them as an array of Product objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function getAllWidgets(req, res, next) {
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  /**
  * Select all widgets from the product table.
  * @return {object} A Q promise.
  */
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

/**
* POST a new widget product and return the Product object.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function createWidget(req, res, next) {
  let widget = req.body;
  console.log(widget);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  /**
  * Insert a new widget into the product table.
  * @return {object} A Q promise.
  */
  function createWidget() {
    let deferred = Q.defer();
    connection.query(
      `INSERT INTO product 
      (name, product_type_id, finish_id, size_id) 
      VALUES (${SqlString.escape(widget.name)},
      ${SqlString.escape(widget.type.id)},
      ${SqlString.escape(widget.finish.id)},
      ${SqlString.escape(widget.size.id)});`
      , function(error, results, fields) {
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

/**
* private function to build a search query string that takes parameters for the where clause.
* @param {string} name The column to use in the where clause, e.g. 's.name'
* @param {string} value The value to use in the where caluse.
* @return {string} The query string.
*/
function createSearchQueryString(name, value) {
  return `SELECT
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
  WHERE ${name} = ${value}
  ORDER BY productId ASC;`;
}

/**
* GET all widget products with a specified size and return an array of Product objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function getWidgetsBySize(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  /**
  * Select widgets with the given size
  * @return {object} A Q promise.
  */
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(
    createSearchQueryString('s.name', name)
    , function(error, results, fields) {
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

/**
* GET all widget products with a specified type and return an array of Product objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function getWidgetsByType(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  /**
  * Select widgets with the given type
  * @return {object} A Q promise.
  */
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(
    createSearchQueryString('t.name', name)
    , function(error, results, fields) {
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

/**
* GET all widget products with a specified finish and return an array of Product objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function getWidgetsByFinish(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  /**
  * Select widgets with the given finish
  * @return {object} A Q promise.
  */
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(
    createSearchQueryString('f.name', name)
    , function(error, results, fields) {
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

/**
* GET all widget products with a specified name and return an array of Product objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function getWidgetsByName(req, res, next) {
  let name = SqlString.escape(req.body.name);
  console.log(name);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let widgets = [];
  /**
  * Select widgets with the given name
  * @return {object} A Q promise.
  */
  function getWidgets() {
    let deferred = Q.defer();
    connection.query(
    createSearchQueryString('p.name', name)
    , function(error, results, fields) {
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

/**
* GET an array of supported search types.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
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
