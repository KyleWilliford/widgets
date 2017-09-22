var Widget = require('./Widget.js');

function WidgetElite(id, Size, Finish, name, typeName) {
  Widget.call(this, id, Size, Finish, name, typeName);
}

module.exports = WidgetElite;