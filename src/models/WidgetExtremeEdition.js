var Widget = require('./Widget.js');
var Finish = require('./Finish.js');

function WidgetExtremeEdition(id, Size, Finish, name) {
  Widget.call(this, id, Size, Finish, name);
}

module.exports = WidgetExtremeEdition;