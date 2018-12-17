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

  var disableMap = function () {
    window.card.delete();
    window.pin.delete();
    document.querySelector('.map').classList.add('map--faded');
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
      window.form.setAddress(Math.round(mainPin.offsetLeft + PIN_WIDTH / 2), Math.round(mainPin.offsetTop + PIN_HEIGHT));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  var onPressEscError = function (evt) {
    if (window.util.isEsc(evt.keyCode)) {
      document.querySelector('div.error').remove();
      document.removeEventListener('keydown', onPressEscError);
    }
  };
  var onPressEscSuccess = function (evt) {
    if (window.util.isEsc(evt.keyCode)) {
      document.querySelector('div.success').remove();
      document.removeEventListener('keydown', onPressEscSuccess);
    }
  };
  var onClickSuccess = function () {
    document.querySelector('div.success').remove();
    document.removeEventListener('click', onClickSuccess);
  };
  var showSuccess = function () {
    var templateSuccess = document.querySelector('#success').content.cloneNode(true);
    var fragmentSuccess = document.createDocumentFragment();
    document.addEventListener('click', onClickSuccess);
    document.addEventListener('keydown', onPressEscSuccess);
    fragmentSuccess.appendChild(templateSuccess);
    document.body.appendChild(fragmentSuccess);
  };
  var showError = function (message) {
    var templateError = document.querySelector('#error').content.cloneNode(true);
    var fragmentError = document.createDocumentFragment();
    templateError.querySelector('.error__message').textContent = message;
    templateError.querySelector('button').addEventListener('click', function () {
      document.querySelector('div.error').remove();
      window.backend.onLoad(showSuccess, showError);
    });
    document.addEventListener('keydown', onPressEscError);
    fragmentError.appendChild(templateError);
    document.body.appendChild(fragmentError);
  };
  var activatePage = function () {
    window.form.enable();
    document.querySelector('.map').classList.remove('map--faded');
    window.backend.onLoad(showError);
    mainPin.removeEventListener('click', activatePage);
  };

  document.querySelector('.map__filters').addEventListener('change', function () {
    window.pin.render(window.filter.check(window.backend.customers));
  });
  mainPin.addEventListener('click', activatePage);
  window.map = {
    activate: activatePage,
    disable: disableMap,
    showSuccess: showSuccess,
    showError: showError
  };
})();
