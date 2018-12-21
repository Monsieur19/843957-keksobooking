'use strict';
(function () {
  var TypeHouse = {
    FLAT: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var onPressEscCard = function (evt) {
    if (window.util.isEsc(evt.keyCode)) {
      deleteCards();
      window.pin.deleteActive();
      document.removeEventListener('keydown', onPressEscCard);
    }
  };
  var renderCard = function (arr) {
    var fragmentCard = document.createDocumentFragment();
    var templateCard = document.querySelector('#card').content.querySelector('.map__card');
    var customerElement = templateCard.cloneNode(true);
    customerElement.querySelector('.popup__avatar').src = arr.author.avatar;
    if (arr.offer.title) {
      customerElement.querySelector('.popup__title').textContent = arr.offer.title;
    } else {
      customerElement.querySelector('.popup__title').remove();
    }
    if (arr.offer.address) {
      customerElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    } else {
      customerElement.querySelector('.popup__text--address').remove();
    }
    if (arr.offer.price) {
      customerElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
    } else {
      customerElement.querySelector('.popup__text--price').remove();
    }
    if (arr.offer.type) {
      customerElement.querySelector('.popup__type').textContent = TypeHouse[arr.offer.type.toUpperCase()];
    } else {
      customerElement.querySelector('.popup__type').remove();
    }
    if (arr.offer.rooms && arr.offer.guests) {
      customerElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
    } else {
      customerElement.querySelector('.popup__text--capacity').remove();
    }
    if (arr.offer.checkin && arr.offer.checkout) {
      customerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    } else {
      customerElement.querySelector('.popup__text--time').remove();
    }
    customerElement.querySelector('.popup__features').innerHTML = '';
    if (arr.offer.features.length === 0) {
      customerElement.querySelector('.popup__features').remove();
    } else {
      for (var i = 0; i < arr.offer.features.length; i++) {
        customerElement.querySelector('.popup__features').innerHTML += '<li class="popup__feature popup__feature--' + arr.offer.features[i] + '"></li>';
      }
    }
    if (arr.offer.description) {
      customerElement.querySelector('.popup__description').textContent = arr.offer.description;
    } else {
      customerElement.querySelector('.popup__description').remove();
    }
    customerElement.querySelector('.popup__photos').innerHTML = '';
    if (arr.offer.photos.length === 0) {
      customerElement.querySelector('.popup__photos').remove();
    } else {
      for (i = 0; i < arr.offer.photos.length; i++) {
        customerElement.querySelector('.popup__photos').innerHTML += '<img src="' + arr.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      }
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
  var openCard = function (obj) {
    deleteCards();
    document.querySelector('.map').insertBefore(renderCard(obj), document.querySelector('.map__filters-container'));
    document.querySelector('.popup__close').addEventListener('click', deleteCards);
    document.addEventListener('keydown', onPressEscCard);
  };
  window.card = {
    open: openCard,
    delete: deleteCards
  };
})();
