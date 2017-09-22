var Widget = require('./Widget.js');

function WidgetExtremeEdition(id, Size, Finish, name, typeName) {
  Widget.call(this, id, Size, Finish, name, typeName);
}

module.exports = WidgetExtremeEdition;