'use strict';

(function () {
  var popup = document.querySelector('.popup');

  var removePopup = function () {
    if (popup) {
      popup.remove();
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  var inputDisable = document.querySelectorAll('fieldset');
  for (var i = 0; i < inputDisable.length; i++) {
    inputDisable[i].disabled = true;
  }

  var onPinClick = function () {
    var mapOverlay = document.querySelector('.map');
    mapOverlay.classList.remove('map--faded');
    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');

    var inputsActive = document.getElementsByTagName('fieldset');
    for (i = 0; i < inputsActive.length; i++) {
      inputsActive[i].disabled = false;
    }

    var coords = mapPinMain.getBoundingClientRect();
    var coords1 = [coords.left, coords.top];
    var addressCoord = document.getElementById('address');
    addressCoord.value = coords1;
  };

  mapPinMain.addEventListener('mouseup', onPinClick);

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onPinClick);
  });
})();
