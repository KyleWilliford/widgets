var Finish = require('./Finish.js');

function Widget(id, size, Finish, name) {
  this.id = id;
  this.size = size;
  this.Finish = Finish;
  this.name = name;
}

module.exports = Widget;