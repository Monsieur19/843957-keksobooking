'use strict';
var ARRAY_TITLE_HOUSE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var ARRAY_TYPE_HOUSE = ['palace', 'flat', 'house', 'bungalo'];
var ARRAY_TIME = ['12:00', '13:00', '14:00'];
var ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ARRAY_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

document.querySelector('.map').classList.remove('map--faded');
var typeHouse = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
var randomElement = function (arr) {
  return arr[randomInteger(0, arr.length - 1)];
};
var randomAmountElement = function (arr) {
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
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
var createCustomer = function () {
  var obj = {
    author: {
      avatar: ''
    },
    offer: {
      title: '',
      address: location.x + ', ' + location.y,
      price: randomInteger(1000, 1000000),
      type: randomElement(ARRAY_TYPE_HOUSE),
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 10),
      checkin: randomElement(ARRAY_TIME),
      checkout: randomElement(ARRAY_TIME),
      features: randomAmountElement(ARRAY_FEATURES),
      description: '',
      photos: shuffleArray(ARRAY_PHOTOS)
    },
    location: {
      x: randomInteger(0, document.querySelector('.map').offsetWidth) - document.querySelector('.map__pin').offsetWidth / 2,
      y: randomInteger(130, 630) - document.querySelector('.map__pin').offsetHeight
    }
  };
  obj.offer.address = obj.location.x + ', ' + obj.location.y;
  return obj;
};
var countCustomers = function (count) {
  var customer = [];
  ARRAY_TITLE_HOUSE = shuffleArray(ARRAY_TITLE_HOUSE);
  for (var i = 0; i < count; i++) {
    customer[i] = createCustomer();
    customer[i].author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    customer[i].offer.title = ARRAY_TITLE_HOUSE[i];
  }
  return customer;
};
var renderPin = function (arr) {
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var customerElement = templatePin.cloneNode(true);
    customerElement.style.left = arr[i].location.x + 'px';
    customerElement.style.top = arr[i].location.y + 'px';
    customerElement.querySelector('img').src = arr[i].author.avatar;
    customerElement.title = arr[i].offer.title;
    fragmentPin.appendChild(customerElement);
  }
  return fragmentPin;
};
var renderCard = function (arr) {
  var fragmentCard = document.createDocumentFragment();
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  for (var i = 0; i < arr.length; i++) {
    var customerElement = templateCard.cloneNode(true);
    customerElement.querySelector('.popup__avatar').src = arr[i].author.avatar;
    customerElement.querySelector('.popup__title').textContent = arr[i].offer.title;
    customerElement.querySelector('.popup__text--address').textContent = arr[i].offer.address;
    customerElement.querySelector('.popup__text--price').textContent = arr[i].offer.price + '₽/ночь';
    customerElement.querySelector('.popup__type').textContent = typeHouse[arr[i].offer.type];
    customerElement.querySelector('.popup__text--capacity').textContent = arr[i].offer.rooms + ' комнаты для ' + arr[i].offer.guests + ' гостей';
    customerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[i].offer.checkin + ', выезд до ' + arr[i].offer.checkout;
    customerElement.querySelector('.popup__features').innerHTML = '';
    for (var j = 0; j < arr[i].offer.features.length; j++) {
      customerElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + arr[i].offer.features[j] + '"></li>';
    }
    customerElement.querySelector('.popup__description').textContent = arr[i].offer.description;
    customerElement.querySelector('.popup__photos').innerHTML = '';
    for (var x = 0; x < arr[i].offer.photos.length; x++) {
      customerElement.querySelector('.popup__photos').innerHTML += '<img src="' + arr[i].offer.photos[x] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
    fragmentCard.appendChild(customerElement);
  }
  return fragmentCard;
};
var customers = countCustomers(8);
document.querySelector('.map__pins').appendChild(renderPin(customers));
document.querySelector('.map').insertBefore(renderCard(customers), document.querySelector('.map__filters-container'));
