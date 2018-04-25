'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var addressInput = form.elements.address;
  var MAX_X = 1150;
  var MAX_Y = 620;
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
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

      var newX = mapPinMain.offsetLeft - shift.x;
      var newY = mapPinMain.offsetTop - shift.y;

      var positionX = newX;
      var positionY = newY;
      if (positionX >= 0 && positionX <= MAX_X && positionY >= 0 && positionY <= MAX_Y) {
        mapPinMain.style.left = newX + 'px';
        mapPinMain.style.top = newY + 'px';
        var pinMainPosition = positionX + ', ' + positionY;
        addressInput.value = pinMainPosition;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
