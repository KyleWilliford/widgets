var Widget = require('./Widget.js');

function WidgetExtremeEdition(id, size, finish, name, type) {
  Widget.call(this, id, size, finish, name, type);
}

module.exports = WidgetExtremeEdition;