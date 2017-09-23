var Widget = require('./Widget.js');

function WidgetExtremeEdition(id, size, finish, name, type, inStock) {
  Widget.call(this, id, size, finish, name, type, inStock);
}

module.exports = WidgetExtremeEdition;