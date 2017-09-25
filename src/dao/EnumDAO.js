/*
* DAO functions for working with enum relations.
*/
const Size = require('../model/Size.js');
const Finish = require('../model/Finish.js');
const WidgetType = require('../model/WidgetType.js');
const config = require('../config/DatabaseConfiguration');
const mysql = require('mysql');
const Q = require('q');

/*
* GET all product types from the product_type_enum table 
* and return them as an array of WidgetType objects.
* @param {object} req The HTTP request object.
* @param {object} res The HTTP response object.
* @param {function} next The next function to call in the middleware chain. 
*/
function getTypes(req, res, next) {
  console.log(req.body);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let types = [];
  function getProductTypes() {
    let deferred = Q.defer();
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
      if (!res.headersSent) res.send(types);
    });
}

function getSizes(req, res, next) {
  console.log(req.body);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let sizes = [];
  function _getSizes() {
    let deferred = Q.defer();
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
      if (!res.headersSent) res.send(sizes);
    });
}

function getFinishes(req, res, next) {
  console.log(req.body);
  let connection = mysql.createConnection(config.getConnectionConfigObject());

  let finishes = [];
  function _getFinishes() {
    let deferred = Q.defer();
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
      if (!res.headersSent) res.send(finishes);
    });
}

module.exports = {
  getTypes: getTypes,
  getSizes: getSizes,
  getFinishes: getFinishes,
};
