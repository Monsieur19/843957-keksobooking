'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var GOOD_STATUS = 200;
  var TIMEOUT = 10000;
  var setSettings = function (onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };
  var getCustomers = function (onSuccess, onError) {
    var xhr = setSettings(onError);
    xhr.addEventListener('load', function () {
      if (xhr.status === GOOD_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL_GET);
    xhr.send();
  };
  var sendForm = function (data, onSuccess, onError) {
    var xhr = setSettings(onError);
    xhr.addEventListener('load', function () {
      if (xhr.status === GOOD_STATUS) {
        onSuccess();
      } else {
        onError();
      }
    });
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
  window.backend = {
    onLoad: getCustomers,
    send: sendForm
  };
})();
