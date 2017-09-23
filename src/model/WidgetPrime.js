var Widget = require('./Widget.js');

function WidgetPrime(id, size, finish, name, type) {
  Widget.call(this, id, size, finish, name, type);
}

module.exports = WidgetPrime;