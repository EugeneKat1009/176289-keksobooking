'use strict';

(function () {
  var DEBOUNCE_PERIOD = 500;
  var lastTimeout;
  window.debounce = function (evt) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(evt, DEBOUNCE_PERIOD);
  };
})();
