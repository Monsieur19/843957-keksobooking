'use strict';
(function () {
  var checkFilter = function (arr) {
    var filterType = document.querySelector('#housing-type').value;
    var filterPrice = document.querySelector('#housing-price').value;
    var filterRoom = document.querySelector('#housing-rooms').value;
    var filterGuest = document.querySelector('#housing-guests').value;
    var features = document.querySelector('#housing-features').querySelectorAll('input[name=features]:checked');
    var featuresValue = [];
    for (var i = 0; i < features.length; i++) {
      featuresValue[i] = features[i].value;
    }
    var arrCopy = arr.slice();
    var customers = arrCopy.filter(function (customer) {
      var isTrue = true;
      if (filterType !== 'any' && customer.offer.type !== filterType) {
        isTrue = false;
      }
      if (filterPrice === 'low' && customer.offer.price > 10000) {
        isTrue = false;
      } else if (filterPrice === 'middle' && (customer.offer.price > 50000 || customer.offer.price < 10000)) {
        isTrue = false;
      } else if (filterPrice === 'high' && customer.offer.price < 50000) {
        isTrue = false;
      }
      if (filterRoom !== 'any' && customer.offer.rooms.toString() !== filterRoom) {
        isTrue = false;
      }
      if (filterGuest !== 'any' && customer.offer.guests.toString() !== filterGuest) {
        isTrue = false;
      }
      for (i = 0; i < featuresValue.length; i++) {
        if (!isTrue) {
          break;
        }
        isTrue = customer.offer.features.includes(document.querySelector('#filter-' + featuresValue[i]).value);
      }
      return isTrue;
    });
    return customers;
  };
  window.filter = {
    check: checkFilter
  };
})();
