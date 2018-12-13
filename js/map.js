'use strict';
(function () {
  var PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var PIN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight + parseInt(10, window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('height'));

  var CoordsMinMax = {
    TOP: 130,
    BOTTOM: 630,
    LEFT: 0,
    RIGHT: 1200
  };

  var mainPin = document.querySelector('.map__pin--main');

  var setAddressCoords = function (x, y) {
    document.querySelector('#address').value = x + ', ' + y;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (mainPin.offsetLeft - shift.x >= CoordsMinMax.LEFT && mainPin.offsetLeft - shift.x <= CoordsMinMax.RIGHT - PIN_WIDTH) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if (mainPin.offsetTop - shift.y >= CoordsMinMax.TOP - PIN_HEIGHT && mainPin.offsetTop - shift.y <= CoordsMinMax.BOTTOM - PIN_HEIGHT) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setAddressCoords(Math.round(mainPin.offsetLeft + PIN_WIDTH / 2), Math.round(mainPin.offsetTop + PIN_HEIGHT));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
