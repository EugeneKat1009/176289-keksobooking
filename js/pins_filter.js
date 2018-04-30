'use strict';

(function () {
  var MAX_LOW_PRICE = 10000;
  var MIN_HIGH_PRICE = 50000;

  var formFilter = document.querySelector('.map__filters');
  var housingPrice = document.getElementById('housing-price');
  var housingType = document.getElementById('housing-type');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var features = formFilter.querySelectorAll('input[type=checkbox]');

  var applyFilter = function () {
    window.debounce(function () {
      var filteredItems = window.pins.filter(function (pin) {
        return filterPrice(pin) && filterRooms(pin) && filterGuests(pin) && filterType(pin) && filterFeatures(pin);
      }).slice(0, 5);
      window.pins.forEach(function (it) {
        it.button.style.display = filteredItems.indexOf(it) >= 0 ? 'block' : 'none';
      });
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  };

  var filterPrice = function (pin) {
    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price < MAX_LOW_PRICE;
      case 'middle':
        return pin.offer.price >= MAX_LOW_PRICE && pin.offer.price < MIN_HIGH_PRICE;
      case 'high':
        return pin.offer.price >= MIN_HIGH_PRICE;
      default:
        return true;
    }
  };

  housingPrice.addEventListener('change', applyFilter);

  var filterType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    } else {
      return pin.offer.type === housingType.value;
    }
  };

  housingType.addEventListener('change', applyFilter);

  var filterRooms = function (pin) {
    if (housingRooms.value === 'any') {
      return true;
    } else {
      return pin.offer.rooms === ~~housingRooms.value;
    }
  };

  housingRooms.addEventListener('change', applyFilter);

  var filterGuests = function (pin) {
    if (housingGuests.value === 'any') {
      return true;
    } else {
      return pin.offer.guests === ~~housingGuests.value;
    }
  };

  housingGuests.addEventListener('change', applyFilter);

  var filterFeatures = function (pin) {
    var trueFeatures = true;
    if (features.length === 0) {
      trueFeatures = true;
    } else {
      features.forEach(function (it) {
        if (it.checked) {
          if (pin.offer.features.indexOf(it.value) === -1) {
            trueFeatures = false;
          }
        }
      });
    }
    return trueFeatures;
  };

  features.forEach(function (it) {
    it.addEventListener('change', applyFilter);
  });
}());
