var Widget = require('./Widget.js');

function WidgetPrime(id, size, finish, name, type, inStock) {
  Widget.call(this, id, size, finish, name, type, inStock);
}

module.exports = WidgetPrime;