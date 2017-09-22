var Widget = require('./Widget.js');

function WidgetExtremeEdition(id, Size, Finish, name, stock) {
  Widget.call(this, id, Size, Finish, name, stock);
}

module.exports = WidgetExtremeEdition;