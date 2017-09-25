/*
* DAO functions for working with order relations.
*/
let Size = require('../model/Size.js');
let Finish = require('../model/Finish.js');
let WidgetType = require('../model/WidgetType.js');
let WidgetFactory = require('../factory/WidgetFactory.js');
let Order = require('../model/Order.js');
let config = require('../config/DatabaseConfiguration');
let mysql = require('mysql');
let SqlString = require('sqlstring');
let Q = require('q');

/**
* GET all orders and return them as an array of Order objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function getAllOrders(req, res, next) {
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let orders = [];
  /**
  * Select all orders from the customer_order table.
  * @return {object} A Q promise.
  */
  function getOrders() {
    let deferred = Q.defer();
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
        const order = new Order(result.orderId, [],
          result.orderDate, result.orderUpdated, result.orderStatus);
        if (order) orders.push(order);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Select all products in orders from the order_inventory table.
  * @return {object} A Q promise.
  */
  function getProductsInOrders() {
    let deferred = Q.defer();
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
        const finish = new Finish(result.finishId, result.finishName,
          result.finishHexCode);
        console.log(finish);
        const type = new WidgetType(result.typeId, result.typeName);
        console.log(type);
        const widget = WidgetFactory.createWidget(result.productId,
          size, finish, result.productName, type, result.inStock);
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
      if (!res.headersSent) res.send(orders);
    });
}

/**
* PUT changes into an order and return the updated Order object.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function updateOrder(req, res, next) {
  console.log(req.body);
  let order = req.body;
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let currentProductIds = [];
  /**
  * Select the products for an order where the order id matches a given id.
  * @return {object} A Q promise.
  */
  function getCurrentOrderProducts() {
    let deferred = Q.defer();
    connection.query(
      `SELECT p.id 
      FROM product p 
      INNER JOIN order_inventory oi ON oi.product_id = p.id 
      WHERE oi.order_id = ${SqlString.escape(order.id)};`
      , function(error, results, fields) {
        if (error) deferred.reject(error);
        results.forEach(function(result) {
          currentProductIds.push(result.id);
        });
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Check if a product is in stock before trying to add it to an order.
  * @return {object} A Q promise.
  */
  function checkIfProductsAreInStock() {
    if (!order || !order.products || order.products.length === 0) return;
    let deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query(
        `SELECT in_stock as inStock 
        FROM product 
        WHERE id = ${SqlString.escape(product.id)};`
        , function(error, results, fields) {
          if (error) deferred.reject(error);
          results.forEach(function(result) {
            if (!result.inStock && !currentProductIds.includes(product.id)) {
              // eslint-disable-next-line max-len
              deferred.reject(`Product with id ${product.id} is not available.`);
              return;
            }
          });
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  /**
  * Update the order status.
  * @return {object} A Q promise.
  */
  function updateStatus() {
    if (!order || !order.order_status_id) return;
    let deferred = Q.defer();
    connection.query(
      `UPDATE customer_order 
      SET order_status_id = 
      ${SqlString.escape(order.order_status_id)}
      WHERE id = ${SqlString.escape(order.id)};`
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Remove existing products from the order that is being updated.
  * A later method should add the current products.
  * @return {object} A Q promise.
  */
  function resetProducts() {
    let deferred = Q.defer();
    connection.query(
      `DELETE FROM order_inventory 
      WHERE order_id = ${SqlString.escape(order.id)};`
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Reset existing products in this order to be in stock.
  * @return {object} A Q promise.
  */
  function resetStock() {
    if (currentProductIds.length === 0) return;
    let deferred = Q.defer();
    currentProductIds.forEach(function(productId) {
      connection.query(
        `UPDATE product SET in_stock = true 
        WHERE id = ${SqlString.escape(productId)};`
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  /**
  * Insert the updated list of products into an order.
  * @return {object} A Q promise.
  */
  function insertOrderInventory() {
    if (!order || !order.products || order.products.length === 0) return;
    let deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query(
        `INSERT INTO order_inventory (order_id, product_id) 
        VALUES (${SqlString.escape(order.id)},${SqlString.escape(product.id)});`
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  /**
  * Set the current order's products to be "out of stock"/unavailable.
  * @return {object} A Q promise.
  */
  function updateStock() {
    if (!order || !order.products || order.products.length === 0) return;
    let deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query(
        `UPDATE product SET in_stock = false 
        WHERE id = ${SqlString.escape(product.id)};`
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
      if (!res.headersSent) res.send(order);
    });
}

/**
* POST a new order and return the new Order object.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function createOrder(req, res, next) {
  console.log(req.body);
  let order = req.body;
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  /**
  * Create an order with the default status of "Pending".
  * @return {object} A Q promise.
  */
  function createCustomerOrder() {
    let deferred = Q.defer();
    // All new orders start off with status 1 = Pending
    connection.query(
      `INSERT INTO customer_order (order_status_id) 
      VALUES (1);`, function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Select the id of the just created order.
  * @return {object} A Q promise.
  */
  function getLastOrderId() {
    let deferred = Q.defer();
    // All new orders start off with status 1 = Pending
    connection.query(
      `SELECT LAST_INSERT_ID() AS orderId;`
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

  /**
  * Attach products to an order.
  * @return {object} A Q promise.
  */
  function insertOrderInventory() {
    if (!order || !order.products || order.products.length === 0) return;
    let deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query(
        `INSERT INTO order_inventory (order_id, product_id) 
        VALUES (${SqlString.escape(order.id)},
        ${SqlString.escape(product.id)});`
        , function(error, results, fields) {
        if (error) deferred.reject(error);
        deferred.resolve();
      });
    });
    return deferred.promise;
  }

  /**
  * Set products to out of stock/unavailable.
  * @return {object} A Q promise.
  */
  function updateStock() {
    if (!order || !order.products || order.products.length === 0) return;
    let deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query(
        `UPDATE product SET in_stock = false 
        WHERE id = ${SqlString.escape(product.id)};`
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
      if (!res.headersSent) res.send(order);
    });
}

/**
* DELETE an order and return the deleted Order object.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function deleteOrder(req, res, next) {
  console.log(req.body);
  let order = req.body;
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  /**
  * Delete all products from the order.
  * @return {object} A Q promise.
  */
  function deleteOrderInventory() {
    let deferred = Q.defer();
    connection.query(
      `DELETE FROM order_inventory 
      WHERE order_id = ${SqlString.escape(order.id)};`
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Delete the order.
  * @return {object} A Q promise.
  */
  function deleteCustomerOrder() {
    let deferred = Q.defer();
    connection.query(
      `DELETE FROM customer_order 
      WHERE id = ${SqlString.escape(order.id)};`
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Reset each product to be in stock.
  * @return {object} A Q promise.
  */
  function resetStock() {
    if (!order || !order.products || order.products.length === 0) return;
    let deferred = Q.defer();
    order.products.forEach(function(product) {
      connection.query(
        `UPDATE product SET in_stock = true 
        WHERE id = ${SqlString.escape(product.id)};`
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
      if (!res.headersSent) res.send(order);
    });
}

/**
* DELETE a product from an order and return a boolean value (or an error).
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain.
*/
function deleteProductFromOrder(req, res, next) {
  let orderId = SqlString.escape(req.body.orderId);
  console.log('orderId ' + orderId);
  let productId = SqlString.escape(req.body.productId);
  console.log('productId ' + productId);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  /**
  * Delete a product from an order.
  * @return {object} A Q promise.
  */
  function deleteOrderInventory() {
    let deferred = Q.defer();
    connection.query(
      `DELETE FROM order_inventory 
      WHERE order_id = ${SqlString.escape(orderId)} 
      AND product_id = ${SqlString.escape(productId)};`
      , function(error, results, fields) {
      if (error) deferred.reject(error);
      deferred.resolve();
    });
    return deferred.promise;
  }

  /**
  * Reset the removed product to be in stock.
  * @return {object} A Q promise.
  */
  function resetStock() {
    let deferred = Q.defer();
    connection.query(
      `UPDATE product SET in_stock = true 
      WHERE id = ${SqlString.escape(productId)};`
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
      if (!res.headersSent) res.send(true);
    });
}

module.exports = {
  getAllOrders: getAllOrders,
  updateOrder: updateOrder,
  createOrder: createOrder,
  deleteOrder: deleteOrder,
  deleteProductFromOrder: deleteProductFromOrder,
};
