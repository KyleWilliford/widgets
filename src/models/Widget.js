var Finish = require('./Finish.js');

function Widget(id, Size, Finish, name) {
  this.id = id;
  this.Size = Size;
  this.Finish = Finish;
  this.name = name;
}

function whatDoIDo() {
  // nothing perceptible
}

module.exports = Widget;