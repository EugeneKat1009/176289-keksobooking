'use strict';

(function () {
  var FILTER_TYPE = 0;
  var FILTER_PRICE = 1;
  var FILTER_ROOMS = 2;
  var FILTER_GUESTS = 3;
  var MAX_LOW_PRICE = 10000;
  var MIN_HIGH_PRICE = 50000;
  var OPTION_ANY = 'any';
  var formFilter = document.querySelector('.map__filters');

  var offerPrice = function (price) {
    var lowPrice = (price < MAX_LOW_PRICE);
    var highPrice = (price >= MIN_HIGH_PRICE);
    var middlePrice = (price >= MAX_LOW_PRICE && price < MIN_HIGH_PRICE);
    switch (!!price) {
      case lowPrice:
        price = 'low';
        break;
      case highPrice:
        price = 'high';
        break;
      case middlePrice:
        price = 'middle';
        break;
      default:
        price = OPTION_ANY;
        break;
    }
    return price;
  };

  var getFeaturesAds = function (pin) {
    var features = formFilter.querySelectorAll('input[type=checkbox]:checked');
    var trueFeatures = true;
    if (features.length === 0) {
      trueFeatures = true;
    } else {
      features.forEach(function (it) {
        if (pin.offer.features.indexOf(it.value) === -1) {
          trueFeatures = false;
        }
      });
    }
    return trueFeatures;
  };

  var getFilter = function (pin) {
    return ((formFilter.elements[FILTER_TYPE].value === OPTION_ANY) ? pin : pin.offer.type === formFilter.elements[FILTER_TYPE].value)
    && ((formFilter.elements[FILTER_PRICE].value === OPTION_ANY) ? pin : offerPrice(pin.offer.price) === formFilter.elements[FILTER_PRICE].value)
    && ((formFilter.elements[FILTER_ROOMS].value === OPTION_ANY) ? pin : pin.offer.rooms === +formFilter.elements[FILTER_ROOMS].value)
    && ((formFilter.elements[FILTER_GUESTS].value === OPTION_ANY) ? pin : pin.offer.guests === +formFilter.elements[FILTER_GUESTS].value)
    && getFeaturesAds(pin);
  };

  window.filterPin = function () {
    var dataPin = window.initiaPin.filter(getFilter);
    return dataPin;
  };
}());
