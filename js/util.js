'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var isEsc = function (currentElement) {
    if (currentElement === 27) {
      return true;
    }
    return false;
  };
  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
  window.util = {
    isEsc: isEsc,
    debounce: debounce
  };
})();
