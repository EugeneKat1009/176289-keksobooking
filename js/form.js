'use strict';

(function () {
  var timeIn = document.getElementById('timein');
  var timeOut = document.getElementById('timeout');
  var hostType = document.getElementById('type');
  var hostPrice = document.getElementById('price');
  var capacity = document.getElementById('capacity');
  var roomNumber = document.getElementById('room_number');

  timeIn.addEventListener('change', function () {
    if (timeIn.options[0].selected === true) {
      timeOut.options[0].selected = true;
    } else if (timeIn.options[1].selected === true) {
      timeOut.options[1].selected = true;
    } else if (timeIn.options[2].selected === true) {
      timeOut.options[2].selected = true;
    }
  });
  timeOut.addEventListener('change', function () {
    if (timeOut.options[0].selected === true) {
      timeIn.options[0].selected = true;
    } else if (timeOut.options[1].selected === true) {
      timeIn.options[1].selected = true;
    } else if (timeOut.options[2].selected === true) {
      timeIn.options[2].selected = true;
    }
  });

  // синхронизация типа жилья
  hostType.addEventListener('change', function () {
    if (hostType.options[0].selected === true) {
      hostPrice.min = 1000;
      hostPrice.placeholder = 'от 1000 рублей';
    } else if (hostType.options[1].selected === true) {
      hostPrice.min = 0;
      hostPrice.placeholder = 'от 0 рублей';
    } else if (hostType.options[2].selected === true) {
      hostPrice.min = 5000;
      hostPrice.placeholder = 'от 5000 рублей';
    } else if (hostType.options[3].selected === true) {
      hostPrice.min = 10000;
      hostPrice.placeholder = 'от 10000 рублей';
    }
  });

  // синхронизация количества людей
  if (roomNumber.options[0].selected === true) {
    capacity.options[2].selected = true;
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[3].disabled = true;
  }

  roomNumber.addEventListener('change', function () {
    if (roomNumber.options[0].selected === true) {
      capacity.options[2].selected = true;
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[3].disabled = true;
    } else if (roomNumber.options[1].selected === true) {
      capacity.options[2].selected = true;
      capacity.options[1].selected = true;
      capacity.options[2].disabled = false;
      capacity.options[1].disabled = false;
      capacity.options[0].disabled = true;
      capacity.options[3].disabled = true;
    } else if (roomNumber.options[2].selected === true) {
      capacity.options[1].selected = true;
      capacity.options[0].selected = true;
      capacity.options[1].disabled = false;
      capacity.options[0].disabled = false;
      capacity.options[2].disabled = true;
      capacity.options[3].disabled = true;
    } else if (roomNumber.options[3].selected === true) {
      capacity.options[3].selected = true;
      capacity.options[3].disabled = false;
      capacity.options[0].disabled = true;
      capacity.options[2].disabled = true;
      capacity.options[1].disabled = true;
    }
  });

  var successMessage = document.querySelector('.success');
  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function () {
    window.backend.save(new FormData(form), function () {
      successMessage.classList.remove('hidden');
    });
    // evt.preventDefault();
  });
  var successMessageRemove = function () {
    if (successMessage) {
      successMessage.classList.add('hidden');
    }
  };
  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, successMessageRemove);
  });
})();
