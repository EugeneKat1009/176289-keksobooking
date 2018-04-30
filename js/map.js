'use strict';

(function () {
  var NUMBER_ACTIVE_PIN = 5;
  var mapOverlay = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');

  var pinMain = document.querySelector('.map__pin--main');

  var inputDisable = document.querySelectorAll('fieldset');
  for (var i = 0; i < inputDisable.length; i++) {
    inputDisable[i].disabled = true;
  }

  var onPinClick = function () {
    mapOverlay.classList.remove('map--faded');
    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');

    var inputsActive = document.getElementsByTagName('fieldset');
    for (i = 0; i < inputsActive.length; i++) {
      inputsActive[i].disabled = false;
    }

    var coords = pinMain.getBoundingClientRect();
    var coords1 = [coords.left, coords.top];
    var addressCoord = document.getElementById('address');
    addressCoord.value = coords1;
  };

  pinMain.addEventListener('mouseup', onPinClick);

  pinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onPinClick);
  });
})();
