'use strict';

/////////////// Copy Image as Base64
(function () {
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log(info, tab);
    if ('ContextCopyImageAsBase64' === info.menuItemId) {
      var img = new Image();
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        var base64 = canvas.toDataURL("image/png");

        console.log(base64);
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.value = base64;
        textarea.select();
        document.execCommand('copy');
        textarea.remove();

      };
      img.src = info.srcUrl;
    }
  });
  chrome.contextMenus.create({
    id: "ContextCopyImageAsBase64",
    title: "Copy Image as Base64",
    contexts: ["image"]
  });
})();


////////////// Block Link
(function () {
  var filter = {urls: ["<all_urls>"]};
  var UrlBlocker_List = [];
  var load = function () {
    chrome.storage.sync.get(['UrlBlocker_List'], function (result) {
      try {
        UrlBlocker_List = JSON.parse(result.UrlBlocker_List);
      } catch (e) {
        UrlBlocker_List = [];
      }
    });
  };
  load();
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    load();
  });
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
      var cancel = false;
      for (var i = 0; i < UrlBlocker_List.length; i++) {
        try {
          var reg = new RegExp(UrlBlocker_List[i].rule);
          if (reg.test(details.url)) {
            cancel = true;
            break;
          }
        } catch (e) {
        }
      }
      return {cancel: cancel};
    },
    filter,
    ["blocking"]
  );
})();

