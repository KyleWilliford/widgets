var Size = require('../model/Size.js');
var Finish = require('../model/Finish.js');
var Widget = require('../model/Widget.js');
var WidgetExtremeEdition = require('../model/WidgetExtremeEdition.js');
var WidgetPrime = require('../model/WidgetPrime.js');
var WidgetElite = require('../model/WidgetElite.js');
var WidgetFactory = require('../factory/WidgetFactory.js');
var Order = require('../model/Order.js');
var config = require('../config/DatabaseConfiguration');
var mysql = require('mysql');
var SqlString = require('sqlstring');
var Q = require('q');

function getAllOrders(req, res, next) {
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  var orders = [];
  function getOrders() {
    var deferred = Q.defer();
    connection.query(
    `SELECT
      o.id AS orderId,
      s.name AS orderStatus,
      o.date_created AS orderDate,
      o.date_updated AS orderUpdated
    FROM customer_order o
    INNER JOIN order_status_enum s ON o.order_status_id = s.id
    ORDER BY orderId DESC;`, function(error, results, fields) {
      results.forEach(function(result) {
        const order = new Order(result.orderId, [], result.orderDate, result.orderUpdated, result.orderStatus);
        if (order) orders.push(order);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  function getProductsInOrders() {
    var deferred = Q.defer();
    connection.query(
    `SELECT
      oi.order_id AS orderId,
      p.id AS productId,
      p.name AS productName,
      t.name AS typeName,
      f.id AS finishId,
      f.name AS finishName,
      f.hex_code AS finishHexCode,
      s.id AS sizeId,
      s.name AS sizeName
    FROM order_inventory oi
    INNER JOIN product p ON oi.product_id = p.id
    INNER JOIN product_type_enum t ON p.product_type_id = t.id
    INNER JOIN finish f ON p.finish_id = f.id
    INNER JOIN size s ON p.size_id = s.id
    ORDER BY orderId DESC;`, function(error, results, fields) {
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.sizeId, result.sizeName);
        console.log(size);
        const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
        console.log(finish);
        const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, result.typeName);
        console.log(widget);
        orders.forEach(function(order) {
          if (order.id === result.orderId) {
            order.products.push(widget);
          }
        });
      });
      console.log(orders);
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getOrders)
    .then(getProductsInOrders)
    .catch(function (error) {
      console.log(error);
    })
    .done(function() {
      res.send(orders);
    });
}

function updateOrder(req, res, next) {
  console.log(req.body);
  var order = req.body;
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  var order_status_id;
  function getStatus() {
    var deferred = Q.defer();
    connection.query('SELECT id FROM order_status_enum WHERE name =' + SqlString.escape(order.status), function(error, results, fields) {
      if (error) throw error;
      if (results.length > 1 || results.length === 0) {
        throw new Error('Failed to look up order status enum.');
      }
      order_status_id = results[0].id;
      deferred.resolve();
    });
    return deferred.promise;
  }

  function updateStatus() {
    var deferred = Q.defer();
    connection.query('UPDATE customer_order SET order_status_id = ' + order_status_id
       + ' WHERE id = ' + SqlString.escape(order.id) + ';', function(error, results, fields) {
      deferred.resolve();
    });
    return deferred.promise;
  }

  function clearProducts() {
    var deferred = Q.defer();
    connection.query('DELETE FROM order_inventory WHERE order_id = ' + SqlString.escape(order.id) + ';', function(error, results, fields) {
      deferred.resolve();
    });
    return deferred.promise;
  }

  function insertProducts() {
    order.products.forEach(function(product) {
      var deferred = Q.defer();
      connection.query('INSERT INTO order_inventory (order_id, product_id) VALUES (' + SqlString.escape(order.id) + ',' + SqlString.escape(product.id) + ');', function(error, results, fields) {
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  Q.fcall(getStatus)
    .then(updateStatus)
    .then(clearProducts)
    .then(insertProducts)
    .catch(function (error) {
      console.log(error);
    })
    .done(function() {
      res.send(order);
    });
}

module.exports = {
  getAllOrders: getAllOrders,
  updateOrder: updateOrder
};