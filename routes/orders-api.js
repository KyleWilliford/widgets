var express = require('express');
var router = express.Router();
var Order = require('../src/models/Order.js');

/* GET orders */
router.get('/', function(req, res, next) {
  let orders = [];
  const order1 = new Order('order1');
  orders.push(order1);
  const order2 = new Order('order2');
  orders.push(order2);
  console.log(orders);
  res.send(orders);
  if (next) next();
});

module.exports = router;