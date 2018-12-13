'use strict';
(function () {
  var ESC_CODE = 27;

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
  window.util = {
    getRandomIntegerFromInterval: getRandomIntegerFromInterval,
    getRandomElement: getRandomElement,
    getRandomAmountElement: getRandomAmountElement,
    shuffleArray: shuffleArray,
    ESC_CODE: ESC_CODE
  };
})();
