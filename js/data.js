'use strict';
(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
  var createCustomer = function (i) {
    var pointX = getRandomIntegerFromInterval(0, document.querySelector('.map').offsetWidth) - document.querySelector('.map__pin').offsetWidth / 2;
    var pointY = getRandomIntegerFromInterval(130, 630) - document.querySelector('.map__pin').offsetHeight;
    var obj = {
      author: {
        avatar: 'img/avatars/user' + (i + 1 < 10 ? '0' + (i + 1) : i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: pointX + ', ' + pointY,
        price: getRandomIntegerFromInterval(1000, 1000000),
        type: getRandomElement(TYPES),
        rooms: getRandomIntegerFromInterval(1, 5),
        guests: getRandomIntegerFromInterval(1, 10),
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomAmountElement(FEATURES),
        description: '',
        photos: shuffleArray(PHOTOS)
      },
      location: {
        x: pointX,
        y: pointY
      }
    };
    return obj;
  };
  var getAmountCustomers = function (count) {
    var customer = [];
    for (var i = 0; i < count; i++) {
      customer[i] = createCustomer(i);
    }
    return customer;
  };
  window.data = {
    getAmountCustomers: getAmountCustomers
  };
})();
