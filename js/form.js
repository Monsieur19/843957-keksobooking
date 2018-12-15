'use strict';
(function () {
  var MinPrice = {
    FLAT: 1000,
    PALACE: 10000,
    HOUSE: 5000,
    BUNGALO: 0
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

  var validateGuestAndRoom = function () {
    var guests = RoomToGuest['ROOM_' + roomSelect.value];
    var isMatch = guests.includes(guestSelect.value);
    if (isMatch) {
      roomSelect.setCustomValidity('');
    } else {
      roomSelect.setCustomValidity('Мало комнат для стольких гостей или помещение не предназначено для гостей');
    }
  };
  var setAddressCoords = function (x, y) {
    document.querySelector('#address').value = x + ', ' + y;
  };
  var onSubmitClick = function () {
    validateGuestAndRoom();
    if (mainForm.checkValidity()) {
      window.backend.send(window.map.showSuccess, window.map.showError);
    }
  };
  var setPrice = function () {
    price.placeholder = MinPrice[type.value.toUpperCase()];
    price.min = MinPrice[type.value.toUpperCase()];
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
  var resetForm = function () {
    disableForm();
    window.map.disable();
    mainForm.reset();
    price.placeholder = 1000;
    price.min = 1000;
    mainPin.addEventListener('click', window.map.activate);
  };
  disableForm();
  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });
  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
  document.querySelector('#type').addEventListener('change', setPrice);
  document.querySelector('.ad-form__submit').addEventListener('click', function (evt) {
    onSubmitClick();
  });
  document.querySelector('.ad-form__reset').addEventListener('click', resetForm);
  window.form = {
    enable: enableForm,
    setAddress: setAddressCoords,
    mainForm: mainForm,
    reset: resetForm
  };
})();
