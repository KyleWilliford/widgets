var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var widgetInventoryDAO = require('./src/dao/WidgetInventoryDAO');
var ordersDAO = require('./src/dao/OrdersDAO');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/search/widgets/size', widgetInventoryDAO.getWidgetsBySize);
app.post('/search/widgets/type', widgetInventoryDAO.getWidgetsByType);
app.post('/search/widgets/finish', widgetInventoryDAO.getWidgetsByFinish);
app.post('/search/widgets/name', widgetInventoryDAO.getWidgetsByName);
app.get('/widgets', widgetInventoryDAO.getAllWidgets);
app.post('/widgets', widgetInventoryDAO.createWidget);
app.get('/orders', ordersDAO.getAllOrders);
app.post('/orders', ordersDAO.createOrder);
app.put('/orders', ordersDAO.updateOrder);
app.delete('/orders', ordersDAO.deleteOrder);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
