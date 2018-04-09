'use strict';
// Переменные
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
var locationMinX = 300;
var locationMaxX = 900;
var locationMinY = 150;
var locationMaxY = 500;

var mapObjects = [];

// удаление затеменения
var mapOverlay = document.querySelector('.map');
mapOverlay.classList.remove('map--faded');

// объявление DOM-переменных
var buttonElement = document.querySelector('.map__pins');
var buttonTemplate = document.querySelector('template').content.querySelector('button.map__pin');
var articleTemplate = document.querySelector('template').content.querySelector('article');
var articleElement = document.querySelector('section.map');
var fragment = document.createDocumentFragment();

var getRandom = function (index) {
  var rand = Math.floor(Math.random() * index);
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
      photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

// объекты
var renderButtonMap = function (btn) {
  var button = buttonTemplate.cloneNode(true);
  button.querySelector('img').src = btn[i].author.avatar;
  button.querySelector('img').alt = btn[i].offer.title;
  button.style.left = btn[i].location.x + 'px';
  button.style.top = btn[i].location.y + 'px';

  return button;
};

for (var i = 0; i <= 8; i++) {
  mapObjects.push(createMap());
}

// кнопки
for (i = 0; i <= 8; i++) {
  fragment.appendChild(renderButtonMap(mapObjects));
}
buttonElement.appendChild(fragment);

// функция генерации объявления
var articleRender = function (articles) {

  var advert = articleTemplate.cloneNode(true);
  advert.querySelector('.popup__title').textContent = articles[i].offer.title;
  advert.querySelector('.popup__text--address').innerHTML = articles[i].offer.address;
  advert.querySelector('.popup__text--price').textContent = articles[i].offer.price + '₽/ночь';

  var accommodationType;
  if (articles[i].offer.type === 'flat') {
    accommodationType = 'Квартира';
  } else if (articles[i].offer.type === 'bungalo') {
    accommodationType = 'Бунгало';
  } else if (articles[i].offer.type === 'house') {
    accommodationType = 'Дом';
  }

  advert.querySelector('.popup__type').textContent = accommodationType;
  advert.querySelector('.popup__text--capacity').textContent = articles[i].offer.rooms + ' комнаты для ' + articles[i].offer.rooms + ' гостей';
  advert.querySelector('.popup__text--time').textContent = 'Заезд после ' + articles[i].offer.checkin + ', выезд до ' + articles[i].offer.checkout;
  advert.querySelector('.popup__photos').src = articles[i].offer.photos;
  // advert.querySelectorAll('.popup__features').innerHTML = articles[i].offer.features;

  var featuresItems = advert.querySelector('.popup__features');
  featuresItems.innerHTML = '';
  for (var j = 0; j < articles[i].offer.features.length; j++) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', 'popup__feature--' + articles[i].offer.features[j]);
    featuresItems.appendChild(featuresItem);
  }

  advert.querySelector('.popup__avatar').src = articles[i].author.avatar;

  return advert;
};

for (i = 0; i <= 8; i++) {
  var fragmentAdvert = fragment.appendChild(articleRender(mapObjects));
  articleElement.appendChild(fragmentAdvert);
}
