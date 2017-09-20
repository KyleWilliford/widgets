var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // TODO: get from db
  res.json([{
    id: 1,
    username: "John"
  }, {
    id: 2,
    username: "Jane"
  }]);
});

module.exports = router;