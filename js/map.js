'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ESC_CODE = 27;
var WIDTH_PIN = document.querySelector('.map__pin--main').offsetWidth;
var HEIGHT_PIN = document.querySelector('.map__pin--main').offsetHeight;

var TypeHouse = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var mainForm = document.querySelector('.ad-form');
var formInputs = mainForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var filterFormInputs = filterForm.querySelectorAll('fieldset,select');
var mainPin = document.querySelector('.map__pin--main');

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
var addClickListenerPin = function (pin, obj) {
  pin.addEventListener('click', function () {
    document.querySelector('.map').insertBefore(renderCard(obj), document.querySelector('.map__filters-container'));
  });
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
    addClickListenerPin(customerElement, arr[i]);
    fragmentPin.appendChild(customerElement);
  }
  return fragmentPin;
};
var renderCard = function (arr) {
  var fragmentCard = document.createDocumentFragment();
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var customerElement = templateCard.cloneNode(true);
  customerElement.querySelector('.popup__avatar').src = arr.author.avatar;
  customerElement.querySelector('.popup__title').textContent = arr.offer.title;
  customerElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  customerElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
  customerElement.querySelector('.popup__type').textContent = TypeHouse[arr.offer.type];
  customerElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  customerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  customerElement.querySelector('.popup__features').innerHTML = '';
  for (var i = 0; i < arr.offer.features.length; i++) {
    customerElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + arr.offer.features[i] + '"></li>';
  }
  customerElement.querySelector('.popup__description').textContent = arr.offer.description;
  customerElement.querySelector('.popup__photos').innerHTML = '';
  for (i = 0; i < arr.offer.photos.length; i++) {
    customerElement.querySelector('.popup__photos').innerHTML += '<img src="' + arr.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }
  customerElement.querySelector('.popup__close').addEventListener('click', deleteCards);
  fragmentCard.appendChild(customerElement);
  return fragmentCard;
};
var deleteCards = function () {
  var allCards = document.querySelectorAll('.map__card');
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].remove();
  }
};
var disableForm = function () {
  mainForm.classList.add('.ad-form--disabled');
  mainForm.querySelector('.ad-form__submit').disabled = true;
  filterForm.disabled = true;
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = true;
  }
  for (i = 0; i < filterFormInputs.length; i++) {
    filterFormInputs[i].disabled = true;
  }
};
var enabledForm = function () {
  mainForm.classList.remove('ad-form--disabled');
  filterForm.disabled = false;
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = false;
  }
  for (i = 0; i < filterFormInputs.length; i++) {
    filterFormInputs[i].disabled = false;
  }
  mainForm.querySelector('.ad-form__submit').disabled = false;
};
var activatePage = function () {
  enabledForm();
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.map__pins').appendChild(renderPin(getAmountCustomers(8)));
  document.querySelector('#address').value = mainPin.offsetLeft + WIDTH_PIN + ', ' + (mainPin.offsetTop + HEIGHT_PIN);
  mainPin.removeEventListener('mouseup', activatePage);
};

disableForm();
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    deleteCards();
  }
});
mainPin.addEventListener('mouseup', activatePage);
