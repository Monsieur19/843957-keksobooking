'use strict';
(function () {
  var deletePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
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
      window.card.open(customerElement, arr[i]);
      fragmentPin.appendChild(customerElement);
    }
    return fragmentPin;
  };
  window.pin = {
    render: renderPin,
    delete: deletePins
  };
})();