var Widget = require('./Widget.js');

function WidgetPrime(id, Size, Finish, name, stock) {
  Widget.call(this, id, Size, Finish, name, stock);
}

module.exports = WidgetPrime;