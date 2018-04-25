'use strict';

(function () {
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

      if (newX >= 0 && newX <= document.querySelector('.map').offsetWidth && newY >= 10 && newY <= document.querySelector('.map').offsetHeight) {
        mapPinMain.style.top = newY + 'px';
        mapPinMain.style.left = newX + 'px';
      }
    };


        //   var pinMainShiftedX = mapPinMain.offsetLeft - shift.x;
        //   var pinMainShiftedY = mapPinMain.offsetTop - shift.y;
        //   var arrowPositionX = newX;
        //   var arrowPositionY = pinMainShiftedY;
        //   if (arrowPositionX >= MIN_X && arrowPositionX <= MAX_X && arrowPositionY >= MIN_Y && arrowPositionY <= MAX_Y) {
        //     mapPinMain.style.left = (pinMainShiftedX) + 'px';
        //     mapPinMain.style.top = (pinMainShiftedY) + 'px';
        //     var pinMainPosition = arrowPositionX + ', ' + arrowPositionY;
        //     addressInput.value = pinMainPosition;
        //   }
        // };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
