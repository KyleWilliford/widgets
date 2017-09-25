var Size = require('../model/Size.js');
var Finish = require('../model/Finish.js');
var WidgetType = require('../model/WidgetType.js');
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
    ORDER BY orderId DESC;`
    , function(error, results, fields) {
      if (error) deferred.reject(error);
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
      p.in_stock AS inStock,
      t.name AS typeId,
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
    ORDER BY orderId DESC;`
    , function(error, results, fields) {
      if (error) deferred.reject(error);
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
        if (orders.length === 0) return;
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
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(orders);
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

  var currentProductIds = [];
  function getCurrentOrderProducts() {
    var deferred = Q.defer();
    connection.query('SELECT p.id FROM product p INNER JOIN order_inventory oi ON oi.product_id = p.id WHERE oi.order_id = ' + SqlString.escape(order.id) + ';'
      , function(error, results, fields) {
        if (error) deferred.reject(error);
        results.forEach(function(result) {
          currentProductIds.push(result.id);
        });
      deferred.resolve();
    });
    return deferred.promise;
  }

  function checkIfProductsAreInStock() {
    var deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query('SELECT in_stock as inStock FROM product WHERE id = ' + SqlString.escape(product.id) + ';'
        , function(error, results, fields) {
          if (error) deferred.reject(error);
          results.forEach(function(result) {
            if (!result.inStock && !currentProductIds.includes(product.id)) {
              deferred.reject(`Product with id ${product.id} is not available.`);
              return;
            }
          });
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  function updateStatus() {
    var deferred = Q.defer();
    connection.query('UPDATE customer_order SET order_status_id = ' + SqlString.escape(order.order_status_id)
       + ' WHERE id = ' + SqlString.escape(order.id) + ';'
       , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  function resetProducts() {
    var deferred = Q.defer();
    connection.query('DELETE FROM order_inventory WHERE order_id = ' + SqlString.escape(order.id) + ';'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  function resetStock() {
    if (currentProductIds.length === 0) return;
    var deferred = Q.defer();
    currentProductIds.forEach(function(productId) {
      connection.query('UPDATE product SET in_stock = true WHERE id = ' + SqlString.escape(productId) + ';'
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  function insertOrderInventory() {
    if (!order || !order.products || order.products.length === 0) return;
    var deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query('INSERT INTO order_inventory (order_id, product_id) VALUES (' + SqlString.escape(order.id) + ',' + SqlString.escape(product.id) + ');'
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  function updateStock() {
    if (!order || !order.products || order.products.length === 0) return;
    var deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query('UPDATE product SET in_stock = false WHERE id = ' + SqlString.escape(product.id) + ';'
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  Q.fcall(getCurrentOrderProducts)
    .then(checkIfProductsAreInStock)
    .then(updateStatus)
    .then(resetProducts)
    .then(resetStock)
    .then(insertOrderInventory)
    .then(updateStock)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(order);
    });
}

function createOrder(req, res, next) {
  console.log(req.body);
  var order = req.body;
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  function createCustomerOrder() {
    var deferred = Q.defer();
    // All new orders start off with status 1 = Pending
    connection.query('INSERT INTO customer_order (order_status_id) VALUES (1);'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  function getLastOrderId() {
    var deferred = Q.defer();
    // All new orders start off with status 1 = Pending
    connection.query('SELECT LAST_INSERT_ID() AS orderId;'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      if (results.length > 1 || results.length === 0) {
        throw new Error('Failed to look up the order id.');
      }
      order.id = results[0].orderId;
      deferred.resolve();
    });
    return deferred.promise;
  }

  function insertOrderInventory() {
    if (!order || !order.products || order.products.length === 0) return;
    var deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query('INSERT INTO order_inventory (order_id, product_id) VALUES (' + SqlString.escape(order.id) + ',' + SqlString.escape(product.id) + ');'
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  function updateStock() {
    if (!order || !order.products || order.products.length === 0) return;
    var deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query('UPDATE product SET in_stock = false WHERE id = ' + SqlString.escape(product.id) + ';'
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  Q.fcall(createCustomerOrder)
    .then(getLastOrderId)
    .then(insertOrderInventory)
    .then(updateStock)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(order);
    });
}

function deleteOrder(req, res, next) {
  console.log(req.body);
  var order = req.body;
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  function deleteOrderInventory() {
    var deferred = Q.defer();
    connection.query('DELETE FROM order_inventory WHERE order_id = ' + SqlString.escape(order.id) + ';'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  function deleteCustomerOrder() {
    var deferred = Q.defer();
    connection.query('DELETE FROM customer_order WHERE id = ' + SqlString.escape(order.id) + ';'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  function resetStock() {
    if (!order || !order.products || order.products.length === 0) return;
    var deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query('UPDATE product SET in_stock = true WHERE id = ' + SqlString.escape(product.id) + ';'
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  Q.fcall(deleteOrderInventory)
    .then(deleteCustomerOrder)
    .then(resetStock)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(order);
    });
}

function deleteProductFromOrder(req, res, next) {
  var orderId = SqlString.escape(req.body.orderId);
  console.log(orderId);
  var productId = SqlString.escape(req.body.productId);
  console.log(productId);
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  function deleteOrderInventory() {
    var deferred = Q.defer();
    connection.query('DELETE FROM order_inventory WHERE order_id = ' + orderId + ' AND product_id = ' + productId + ';'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  function resetStock() {
    var deferred = Q.defer();
    connection.query('UPDATE product SET in_stock = true WHERE id = ' + productId + ';'
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(deleteOrderInventory)
    .then(resetStock)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(true);
    });
}

module.exports = {
  getAllOrders: getAllOrders,
  updateOrder: updateOrder,
  createOrder: createOrder,
  deleteOrder: deleteOrder,
  deleteProductFromOrder: deleteProductFromOrder
};