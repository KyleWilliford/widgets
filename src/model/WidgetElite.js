let Widget = require('./Widget.js');

function WidgetElite(id, size, finish, name, type, inStock) {
  Widget.call(this, id, size, finish, name, type, inStock);
}

module.exports = WidgetElite;
