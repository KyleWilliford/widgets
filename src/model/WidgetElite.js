var Widget = require('./Widget.js');

function WidgetElite(id, Size, Finish, name, stock) {
  Widget.call(this, id, Size, Finish, name, stock);
}

module.exports = WidgetElite;