'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;
  var checkFilter = function (arr) {
    var filterType = document.querySelector('#housing-type').value;
    var filterPrice = document.querySelector('#housing-price').value;
    var filterRoom = document.querySelector('#housing-rooms').value;
    var filterGuest = document.querySelector('#housing-guests').value;
    var features = document.querySelector('#housing-features').querySelectorAll('input[name=features]:checked');
    var valueFeatures = [];
    for (var i = 0; i < features.length; i++) {
      valueFeatures[i] = features[i].value;
    }
    var arrCopy = arr.slice();
    var customers = arrCopy.filter(function (customer) {
      var isTrue = true;
      if (filterType !== 'any' && customer.offer.type !== filterType) {
        isTrue = false;
      }
      if (filterPrice === 'low' && customer.offer.price > MIN_PRICE) {
        isTrue = false;
      } else if (filterPrice === 'middle' && (customer.offer.price > MAX_PRICE || customer.offer.price < MIN_PRICE)) {
        isTrue = false;
      } else if (filterPrice === 'high' && customer.offer.price < MAX_PRICE) {
        isTrue = false;
      }
      if (filterRoom !== 'any' && customer.offer.rooms.toString() !== filterRoom) {
        isTrue = false;
      }
      if (filterGuest !== 'any' && customer.offer.guests.toString() !== filterGuest) {
        isTrue = false;
      }
      for (i = 0; i < valueFeatures.length; i++) {
        if (!isTrue) {
          break;
        }
        isTrue = customer.offer.features.includes(document.querySelector('#filter-' + valueFeatures[i]).value);
      }
      return isTrue;
    });
    return customers;
  };
  var resetFilter = function () {
    document.querySelector('.map__filters').reset();
  };
  window.filter = {
    check: checkFilter,
    reset: resetFilter
  };
})();
