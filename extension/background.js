'use strict';

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
