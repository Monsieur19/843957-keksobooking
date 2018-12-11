'use strict';
(function () {
  var ESC_CODE = 27;

  var TypeHouse = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Дом',
    bungalo: 'Бунгало'
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
  window.pinAndCard = {
    renderPin: renderPin,
    deleteCards: deleteCards
  };
})();
