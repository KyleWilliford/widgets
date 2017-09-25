var Size = require('../model/Size.js');
var Finish = require('../model/Finish.js');
var WidgetType = require('../model/WidgetType.js');
var config = require('../config/DatabaseConfiguration');
var mysql = require('mysql');
var SqlString = require('sqlstring');
var Q = require('q');

function getTypes(req, res, next) {
  console.log(req.body);
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  let types = [];
  function getProductTypes() {
    var deferred = Q.defer();
    connection.query(
    `SELECT
      id,
      name
    FROM product_type_enum
    ORDER BY id ASC;`, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const type = new WidgetType(result.id, result.name);
        console.log(type);
        if (type) types.push(type);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(getProductTypes)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(types);
    });
}

function getSizes(req, res, next) {
  console.log(req.body);
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  let sizes = [];
  function _getSizes() {
    var deferred = Q.defer();
    connection.query(
    `SELECT
      id,
      name
    FROM size
    ORDER BY id ASC;`, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const size = new Size(result.id, result.name);
        console.log(size);
        if (size) sizes.push(size);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(_getSizes)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(sizes);
    });
}

function getFinishes(req, res, next) {
  console.log(req.body);
  var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
  });

  let finishes = [];
  function _getFinishes() {
    var deferred = Q.defer();
    connection.query(
    `SELECT
      id,
      name,
      hex_code
    FROM finish
    ORDER BY id ASC;`, function(error, results, fields) {
      if (error) deferred.reject(error);
      console.log(results);
      results.forEach(function(result) {
        console.log(result);
        const finish = new Finish(result.id, result.name, result.hex_code);
        console.log(finish);
        if (finish) finishes.push(finish);
      });
      deferred.resolve();
    });
    return deferred.promise;
  }

  Q.fcall(_getFinishes)
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    })
    .done(function() {
      if(!res.headersSent) res.send(finishes);
    });
}

module.exports = {
  getTypes: getTypes,
  getSizes: getSizes,
  getFinishes: getFinishes
};