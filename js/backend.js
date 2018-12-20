'use strict';
(function () {
  var getCustomers = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();
  };
  var sendForm = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var data = new FormData(window.form.mainForm);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.form.reset();
        window.filter.reset();
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
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.backend = {
    onLoad: getCustomers,
    send: sendForm
  };
})();
