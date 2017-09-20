var Widget = require('./Widget.js');
var Finish = require('./Finish.js');

function WidgetExtremeEdition(id, size, Finish, name) {
  Widget.call(this, id, size, Finish, name);
}

module.exports = WidgetExtremeEdition;