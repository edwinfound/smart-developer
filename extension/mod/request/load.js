(function () {

  var request = function (payload, callback) {

    var param = [];
    for (var i = 0; i < payload.params.length; i++) {
      param.push(encodeURIComponent(payload.params[i].name)+'='+encodeURIComponent(payload.params[i].value));
    }

    var xhr = new XMLHttpRequest();

    if (payload.method === 'post') {
      xhr.open('POST', payload.url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    } else {
      xhr.open('GET', payload.url);
    }

    for (var i = 0; i < payload.headers.length; i++) {
      xhr.setRequestHeader(payload.headers[i].name, payload.headers[i].value);
    }
    xhr.onload = function () {
      console.log('xhr->', xhr);
      var response = {};
      response.status = xhr.status;
      response.headers = [];
      response.body = xhr.responseText;
      callback(response);
    };

    if (payload.method === 'post') {
      xhr.send(param.join('&'));
    } else {
      xhr.send();
    }

  };


  chrome.runtime.onMessage.addListener(
    function (msg, sender, sendResponse) {
      if (('type' in msg) && ('payload' in msg) && msg.type === 'Requester_Request') {
        console.log('msg----------->', msg);

        var payload = {};
        payload.id = msg.payload.id;
        payload.request = msg.payload.request;

        request(msg.payload.request, function (response) {
          payload.response = response;
          chrome.runtime.sendMessage({
            type: 'Requester_Response',
            payload: payload
          });
        });

      }
    });

  setTimeout(function () {


  }, 1);
})();
