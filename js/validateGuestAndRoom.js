'use strict';
(function () {
  var RoomToGuest = {
    ROOM_1: ['1'],
    ROOM_2: ['1', '2'],
    ROOM_3: ['1', '2', '3'],
    ROOM_100: ['0'],
  };

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
  var onSubmitClick = function () {
    validateGuestAndRoom();
  };

  document.querySelector('.ad-form__submit').addEventListener('click', onSubmitClick);
})();
