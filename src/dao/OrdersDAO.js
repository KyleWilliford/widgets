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

function getAllOrders(req, res, next) {
  try {
    var connection = mysql.createConnection({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database
    });
    connection.query(
      `SELECT
        o.id AS orderId,
        s.name AS orderStatus,
        o.date_created AS orderDate,
        o.date_updated AS orderUpdated
      FROM customer_order o
      INNER JOIN order_status_enum s ON o.order_status_id = s.id
      ORDER BY orderId DESC;`,
      function (error, results, fields) {
      if (error) throw error;
      let orders = [];
      results.forEach(function(result) {
        const order = new Order(result.orderId, [], result.orderDate, result.orderUpdated);
        if (order) orders.push(order);
      });
      console.log(orders);
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
      ORDER BY orderId DESC;`,
      function (error, results, fields) {
        if (error) throw error;
        results.forEach(function(result) {
          console.log(result);
          const size = new Size(result.sizeId, result.sizeName);
          console.log(size);
          const finish = new Finish(result.finishId, result.finishName, result.finishHexCode);
          console.log(finish);
          const widget = WidgetFactory.createWidget(result.productId, size, finish, result.productName, result.quantity);
          console.log(widget);
          orders.forEach(function(order) {
            if (order.id === result.orderId) {
              order.products.push(widget);
            }
          });
        });
        res.send(orders);
      });
    });
  } catch(error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  getAllOrders: getAllOrders
};