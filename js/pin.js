'use strict';
(function () {
  var deletePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
  };
  var deleteActive = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].classList.remove('map__pin--active');
    }
  };
  var renderPin = function (arr) {
    if (arr.offer) {
      window.card.delete();
      var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
      var fragmentPin = document.createDocumentFragment();
      var customerElement = templatePin.cloneNode(true);
      customerElement.style.left = arr.location.x + 'px';
      customerElement.style.top = arr.location.y + 'px';
      customerElement.querySelector('img').src = arr.author.avatar;
      customerElement.title = arr.offer.title;
      fragmentPin.appendChild(customerElement);
      customerElement.addEventListener('click', function () {
        deleteActive();
        customerElement.classList.add('map__pin--active');
        window.card.open(arr);
      });
      document.querySelector('.map__pins').appendChild(fragmentPin);
    }
  };
  window.pin = {
    render: renderPin,
    delete: deletePins,
    deleteActive: deleteActive
  };
})();
