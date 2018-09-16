module.exports = {
  set: function (key, value, cb) {
    if (!!!chrome.storage) {
      cb && cb();
      return;
    }
    var data = {};
    data[key] = JSON.stringify(value);
    chrome.storage.sync.set(data, function () {
      cb && cb();
    });
  },
  get: function (key, defaultValue, cb) {
    if (!!!chrome.storage) {
      cb && cb(defaultValue);
      return;
    }
    chrome.storage.sync.get([key], function (result) {
      try {
        var v = JSON.parse(result[key]);
        cb && cb(v);
      } catch (e) {
        cb && cb(defaultValue);
      }
    });
  }
}

