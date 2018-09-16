var Util = require('./util')
module.exports = {
  isEmpty: function (text) {
    if (!text) {
      return true
    }
    if (!Util.trim(text)) {
      return true
    }
    return false
  }
}
