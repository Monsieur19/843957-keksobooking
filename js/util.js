'use strict';
(function () {
  var isEsc = function (currentElement) {
    if (currentElement === 27) {
      return true;
    }
    return false;
  };
  var getRandomIntegerFromInterval = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };
  var getRandomElement = function (arr) {
    return arr[getRandomIntegerFromInterval(0, arr.length - 1)];
  };
  var getRandomAmountElement = function (arr) {
    var array = [];
    var index = 0;
    for (var i = 0; i < arr.length; i++) {
      if (Math.random() >= 0.5) {
        array[index] = arr[i];
        index++;
      }
    }
    return array;
  };
  var shuffleArray = function (array) {
    var arrayCopy = array.slice();
    for (var i = arrayCopy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[j];
      arrayCopy[j] = temp;
    }
    return arrayCopy;
  };
  var DEBOUNCE_INTERVAL = 1000;
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
    getRandomIntegerFromInterval: getRandomIntegerFromInterval,
    getRandomElement: getRandomElement,
    getRandomAmountElement: getRandomAmountElement,
    shuffleArray: shuffleArray,
    isEsc: isEsc,
    debounce: debounce
  };
})();
