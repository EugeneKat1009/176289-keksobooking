'use strict';

window.util = (function () {
  var ESC_BTN = 27;
  var ENTER_BTN = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_BTN) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_BTN) {
        action();
      }
    },
    getRandom: function (array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    },
  };
})();
