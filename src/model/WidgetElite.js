var Widget = require('./Widget.js');

function WidgetElite(id, size, finish, name, type) {
  Widget.call(this, id, size, finish, name, type);
}

module.exports = WidgetElite;