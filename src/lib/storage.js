module.exports = {
  set: function (key, value, cb) {
    if (!!!chrome.storage) {
      window.localStorage.setItem(key, value)
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
      let value = window.localStorage.getItem(key)
      if (!value) {
        value = defaultValue
      }
      cb && cb(value);
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
  },
  localSet: function (key, value, cb) {
    if (!!!chrome.storage) {
      window.localStorage.setItem(key, value)
      cb && cb();
      return;
    }
    var data = {};
    data[key] = JSON.stringify(value);
    chrome.storage.local.set(data, function () {
      cb && cb();
    });
  },
  localGet: function (key, defaultValue, cb) {
    if (!!!chrome.storage) {
      var value = window.localStorage.getItem(key)
      if (null === value) {
        value = defaultValue
      }
      cb && cb(value);
      return;
    }
    chrome.storage.local.get([key], function (result) {
      try {
        var v = JSON.parse(result[key]);
        cb && cb(v);
      } catch (e) {
        cb && cb(defaultValue);
      }
    });
  }
}

