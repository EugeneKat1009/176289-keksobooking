'use strict';
// Переменные
// var ESC_BTN = 27;
var ENTER_BTN = 13;

var offerTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerType = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerCheckout = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPriceMin = 1000;
var offerPriceMax = 1000000;
var offerRoomsMin = 1;
var offerRoomsMax = 5;
var guestsMin = 1;
var guestsMax = 14;
var offerFeaturesMin = 0;
var offerFeaturesMax = offerFeatures.length;
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var locationMinX = 300;
var locationMaxX = 900;
var locationMinY = 150;
var locationMaxY = 500;

var mapObjects = [];

// объявление DOM-переменных
var buttonElement = document.querySelector('.map__pins');
var buttonTemplate = document.querySelector('template').content.querySelector('button.map__pin');
var articleTemplate = document.querySelector('template').content.querySelector('article');
var articleElement = document.querySelector('section.map');
var fragment = document.createDocumentFragment();

var getRandom = function (maxNumber) {
  var rand = Math.floor(Math.random() * maxNumber);
  return rand;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

// генерация массива
var createMap = function () {
  var locationX = getRandomNumber(locationMinX, locationMaxX);
  var locationY = getRandomNumber(locationMinY, locationMaxY);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: offerTitle[getRandom(offerTitle.length)],
      address: locationX + ', ' + locationY,
      price: getRandomNumber(offerPriceMin, offerPriceMax),
      type: offerType[getRandom(offerType.length)],
      rooms: getRandomNumber(offerRoomsMin, offerRoomsMax),
      guests: getRandomNumber(guestsMin, guestsMax),
      checkin: offerCheckin[getRandom(offerCheckin.length)],
      checkout: offerCheckout[getRandom(offerCheckout.length)],
      features: offerFeatures.slice(getRandomNumber(offerFeaturesMin, offerFeaturesMax)),
      description: '',
      photos: offerPhotos[getRandom(offerPhotos.length)]
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

// объекты
var renderButtonMap = function (btn, index) {
  var button = buttonTemplate.cloneNode(true);
  button.querySelector('img').src = btn[index].author.avatar;
  button.querySelector('img').alt = btn[index].offer.title;
  button.style.left = btn[index].location.x + 'px';
  button.style.top = btn[index].location.y + 'px';

  return button;
};

for (var i = 0; i < 8; i++) {
  mapObjects.push(createMap());
}

// кнопки
for (var btnIndex = 0; btnIndex < 8; btnIndex++) {
  fragment.appendChild(renderButtonMap(mapObjects, btnIndex));
}
buttonElement.appendChild(fragment);

// функция генерации объявления
var articleRender = function (articles, index) {

  var advert = articleTemplate.cloneNode(true);
  advert.querySelector('.popup__title').textContent = articles[index].offer.title;
  advert.querySelector('.popup__text--address').innerHTML = articles[index].offer.address;
  advert.querySelector('.popup__text--price').textContent = articles[index].offer.price + '₽/ночь';

  var accommodationType;
  if (articles[index].offer.type === 'flat') {
    accommodationType = 'Квартира';
  } else if (articles[index].offer.type === 'bungalo') {
    accommodationType = 'Бунгало';
  } else if (articles[index].offer.type === 'house') {
    accommodationType = 'Дом';
  }

  advert.querySelector('.popup__type').textContent = accommodationType;
  advert.querySelector('.popup__text--capacity').textContent = articles[index].offer.rooms + ' комнаты для ' + articles[index].offer.rooms + ' гостей';
  advert.querySelector('.popup__text--time').textContent = 'Заезд после ' + articles[index].offer.checkin + ', выезд до ' + articles[index].offer.checkout;

  var featuresItems = advert.querySelector('.popup__features');
  featuresItems.innerHTML = '';
  for (var j = 0; j < articles[index].offer.features.length; j++) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', 'popup__feature--' + articles[index].offer.features[j]);
    featuresItems.appendChild(featuresItem);
  }

  var photoItem = advert.querySelector('.popup__photo');
  photoItem.src = articles[index].offer.photos;

  advert.querySelector('.popup__avatar').src = articles[index].author.avatar;

  return advert;
};

var selectedIndex = 0;
var fragmentAdvert = fragment.appendChild(articleRender(mapObjects, selectedIndex));
articleElement.appendChild(fragmentAdvert);

var removePopup = function () {
  var popupClose = document.querySelector('.popup');
  if (popupClose) {
    popupClose.remove();
  }
};

var mapPinMain = document.querySelector('.map__pin--main');

var inputDisable = document.querySelectorAll('fieldset');
for (i = 0; i < inputDisable.length; i++) {
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
  if (evt.keyCode === ENTER_BTN) {
    onPinClick();
  }
});

var popupClose = fragmentAdvert.querySelector('.popup__close');
popupClose.addEventListener('click', function () {
  removePopup();
});

// синхронизация времени
var timeIn = document.getElementById('timein');
var timeOut = document.getElementById('timeout');

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
var hostType = document.getElementById('type');
var hostPrice = document.getElementById('price');

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
var capacity = document.getElementById('capacity');
var roomNumber = document.getElementById('room_number');

roomNumber.addEventListener('change', function () {
  if (roomNumber.options[0].selected === true) {
    capacity.options[2].selected = true;
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[3].disabled = true;
  } else if (roomNumber.options[1].selected === true) {
    capacity.options[2].selected = true;
    capacity.options[1].selected = true;
    capacity.options[0].disabled = true;
    capacity.options[3].disabled = true;
  } else if (roomNumber.options[2].selected === true) {
    capacity.options[1].selected = true;
    capacity.options[0].selected = true;
    capacity.options[2].disabled = true;
    capacity.options[3].disabled = true;
  } else if (roomNumber.options[3].selected === true) {
    capacity.options[3].selected = true;
    capacity.options[0].disabled = true;
    capacity.options[2].disabled = true;
    capacity.options[1].disabled = true;
  }
});
