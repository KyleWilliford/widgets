var Widget = require('./Widget.js');

function WidgetElite(id, Size, Finish, name) {
  Widget.call(this, id, Size, Finish, name);
}

module.exports = WidgetElite;