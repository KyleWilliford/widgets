var Widget = require('./Widget.js');

function WidgetPrime(id, Size, Finish, name) {
  Widget.call(this, id, Size, Finish, name);
}

module.exports = WidgetPrime;