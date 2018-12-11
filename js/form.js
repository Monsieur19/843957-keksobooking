'use strict';
(function () {
  var MinPrice = {
    flat: 1000,
    palace: 10000,
    house: 5000,
    bungalo: 0
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
  var activatePage = function () {
    enableForm();
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.map__pins').appendChild(window.pinAndCard.renderPin(window.data.getAmountCustomers(8)));
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
    window.pinAndCard.deleteCards();
    deletePins();
    disableForm();
    mainForm.reset();
    document.querySelector('.map').classList.add('map--faded');
    price.placeholder = 1000;
    price.min = 1000;
    mainPin.addEventListener('mouseup', activatePage);
  };
  disableForm();
  mainPin.addEventListener('mouseup', activatePage);
  document.querySelector('.ad-form__reset').addEventListener('click', resetForm);
})();
