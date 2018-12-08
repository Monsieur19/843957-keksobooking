'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ESC_CODE = 27;
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 700;

var TypeHouse = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var MinPrice = {
  flat: 1000,
  palace: 10000,
  house: 5000,
  bungalo: 0
};
var RoomToGuest = {
  ROOM_1: ['1'],
  ROOM_2: ['1', '2'],
  ROOM_3: ['1', '2', '3'],
  ROOM_100: ['0'],
};

var mainForm = document.querySelector('.ad-form');
var formInputs = mainForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var filterFormInputs = filterForm.querySelectorAll('fieldset,select');
var mainPin = document.querySelector('.map__pin--main');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var roomSelect = document.querySelector('#room_number');
var guestSelect = document.querySelector('#capacity');

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
var onPressEscCard = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    deleteCards();
    document.removeEventListener('keydown', onPressEscCard);
  }
};
var openCard = function (pin, obj) {
  pin.addEventListener('click', function () {
    deleteCards();
    document.querySelector('.map').insertBefore(renderCard(obj), document.querySelector('.map__filters-container'));
    document.querySelector('.popup__close').addEventListener('click', deleteCards);
    document.addEventListener('keydown', onPressEscCard);
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
    openCard(customerElement, arr[i]);
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
  fragmentCard.appendChild(customerElement);
  return fragmentCard;
};
var deleteCards = function () {
  var allCards = document.querySelectorAll('.map__card');
  for (var i = 0; i < allCards.length; i++) {
    allCards[i].remove();
  }
};
var deletePins = function () {
  var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < allPins.length; i++) {
    allPins[i].remove();
  }
};
var setPrice = function () {
  price.placeholder = MinPrice[type.value];
  price.min = MinPrice[type.value];
};
var disableForm = function () {
  mainForm.classList.add('ad-form--disabled');
  mainForm.querySelector('.ad-form__submit').disabled = true;
  filterForm.disabled = true;
  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = true;
  }
  for (i = 0; i < filterFormInputs.length; i++) {
    filterFormInputs[i].disabled = true;
  }
};
var enableForm = function () {
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
var setAddressCoords = function (x, y) {
  document.querySelector('#address').value = x + ', ' + y;
};
var activatePage = function () {
  enableForm();
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.map__pins').appendChild(renderPin(getAmountCustomers(8)));
  setAddressCoords(MAP_WIDTH / 2, MAP_HEIGHT / 2);
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  document.querySelector('#type').addEventListener('change', setPrice);
  mainPin.removeEventListener('mouseup', activatePage);
};
var resetForm = function (evt) {
  evt.preventDefault();
  deleteCards();
  deletePins();
  disableForm();
  mainForm.reset();
  document.querySelector('.map').classList.add('map--faded');
  price.placeholder = 1000;
  price.min = 1000;
  mainPin.addEventListener('mouseup', activatePage);
};
var validateGuestAndRoom = function () {
  var guests = RoomToGuest['ROOM_' + roomSelect.value];
  var isMatch = guests.includes(guestSelect.value);
  if (isMatch) {
    roomSelect.setCustomValidity('');
  } else {
    roomSelect.setCustomValidity('Мало комнат для стольких гостей или помещение не предназначено для гостей');
  }
};
var onSubmitClick = function () {
  validateGuestAndRoom();
};

disableForm();
mainPin.addEventListener('mouseup', activatePage);
document.querySelector('.ad-form__submit').addEventListener('click', onSubmitClick);
document.querySelector('.ad-form__reset').addEventListener('click', resetForm);
