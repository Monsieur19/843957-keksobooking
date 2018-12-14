'use strict';
(function () {
  var getCustomers = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.pin.render(xhr.response);
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();
  };
  window.backend = {
    onLoad: getCustomers
  };
})();
