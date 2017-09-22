var Widget = require('./Widget.js');

function WidgetPrime(id, Size, Finish, name, typeName) {
  Widget.call(this, id, Size, Finish, name, typeName);
}

module.exports = WidgetPrime;