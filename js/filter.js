'use strict';
(function () {
  var checkFilter = function (arr) {
    var features = document.querySelector('#housing-features').querySelectorAll('input[name=features]:checked');
    var featuresValue = [];
    for (var i = 0; i < features.length; i++) {
      featuresValue[i] = features[i].value;
    }
    var arrCopy = arr.slice();
    var customers = arrCopy.filter(function (customer) {
      if (document.querySelector('#housing-type').value === 'any') {
        return customer;
      } else {
        return customer.offer.type === document.querySelector('#housing-type').value;
      }
    });
    
    customers = customers.filter(function (customer) {
      if (document.querySelector('#housing-price').value === 'any') {
        return customer;
      } else if (document.querySelector('#housing-price').value === 'middle' && customer.offer.price >= 10000 && customer.offer.price <= 50000) {
        return customer;
      } else if (document.querySelector('#housing-price').value === 'low' && customer.offer.price <= 10000) {
        return customer;
      } else if (document.querySelector('#housing-price').value === 'high' && customer.offer.price >= 50000) {
        return customer;
      } else {
        return false;
      }
    });
    customers = customers.filter(function (customer) {
      if (document.querySelector('#housing-rooms').value === 'any') {
        return customer;
      } else {
        return customer.offer.rooms.toString() === document.querySelector('#housing-rooms').value;
      }
    });
    customers = customers.filter(function (customer) {
      if (document.querySelector('#housing-guests').value === 'any') {
        return customer;
      } else {
        return customer.offer.guests.toString() === document.querySelector('#housing-guests').value;
      }
    });
    customers = customers.filter(function (customer) {
      var isFeature = true;
      for (i = 0; i < featuresValue.length; i++) {
        isFeature = customer.offer.features.includes(document.querySelector('#filter-' + featuresValue[i]).value);
        if (!isFeature) {
          break;
        }
      }
      return isFeature;
    });
    return customers;
  };
  window.filter = {
    check: checkFilter
  };
})();
