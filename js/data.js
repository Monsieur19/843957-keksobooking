'use strict';
(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var createCustomer = function (i) {
    var pointX = window.util.getRandomIntegerFromInterval(0, document.querySelector('.map').offsetWidth) - document.querySelector('.map__pin').offsetWidth / 2;
    var pointY = window.util.getRandomIntegerFromInterval(130, 630) - document.querySelector('.map__pin').offsetHeight;
    var obj = {
      author: {
        avatar: 'img/avatars/user' + (i + 1 < 10 ? '0' + (i + 1) : i + 1) + '.png'
      },
      offer: {
        title: TITLES[i],
        address: pointX + ', ' + pointY,
        price: window.util.getRandomIntegerFromInterval(1000, 1000000),
        type: window.util.getRandomElement(TYPES),
        rooms: window.util.getRandomIntegerFromInterval(1, 5),
        guests: window.util.getRandomIntegerFromInterval(1, 10),
        checkin: window.util.getRandomElement(TIMES),
        checkout: window.util.getRandomElement(TIMES),
        features: window.util.getRandomAmountElement(FEATURES),
        description: '',
        photos: window.util.shuffleArray(PHOTOS)
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
