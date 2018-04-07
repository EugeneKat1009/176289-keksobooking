'use strict';
// Переменные
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPriceMin = 1000;
var offerPriceMax =1000000;
var offerRoomsMin = 1;
var offerRoomsMax = 5;
var guestsMin = 1;
var guestsMax = 14;
var OFFER_FEATURES_MIN = 0;
var OFFER_FEATURES_MAX = OFFER_FEATURES.length;
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

function getRandomNumber(min, max) {
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
    title: OFFER_TITLE[getRandom(OFFER_TITLE.length)],
    addres: locationX + ', ' + locationY,
    price: getRandomNumber(offerPriceMin, offerPriceMax),
    type: OFFER_TYPE[getRandom(OFFER_TYPE.length)],
    rooms: getRandomNumber(offerRoomsMin, offerRoomsMax),
    guests: getRandomNumber(guestsMin, guestsMax),
    checkin: OFFER_CHECKIN[getRandom(OFFER_CHECKIN.length)],
    checkout: OFFER_CHECKOUT[getRandom(OFFER_CHECKOUT.length)],
    features: OFFER_FEATURES.slice(getRandomNumber(OFFER_FEATURES_MIN, OFFER_FEATURES_MAX)),
    description: '',
    photos: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
},
  location: {
    x: locationX,
    y: locationY
  }
}
};

// объекты
var renderButtonMap = function (btn) {
  var button = buttonTemplate.cloneNode(true);
  button.querySelector('img').src = btn[i].author.avatar;
  button.querySelector('img').alt = btn[i].offer.title;
  button.style.left = btn[i].location.x + 'px';
  button.style.top = btn[i].location.y + 'px';

  return button;
}

for (var i = 1; i <= 8 ; i++) {
  mapObjects.push(createMap());
}

// кнопки
for (i = 0; i < 8; i++) {
  fragment.appendChild(renderButtonMap(mapObjects));
}
buttonElement.appendChild(fragment);

// функция генерации объявления
var articleRender = function (article) {
  var advert = articleTemplate.cloneNode(true);
  advert.querySelector('.popup__title').textContent = article[i].offer.title;
  // advert.querySelector('.popup__text--address').textContent = article[i].offer.address;
  advert.querySelector('.popup__text--price').textContent = article[i].offer.price + '₽/ночь';

var  accommodationType;
if (article[i].offer.type === 'flat') {
  accommodationType = 'Квартира';
} else if (article[i].offer.type === 'bungalo') {
  accommodationType = 'Бунгало';
} else if (article[i].offer.type === 'house') {
  accommodationType = 'Дом';
}

advert.querySelector('.popup__type').textContent = accommodationType;
advert.querySelector('.popup__text--capacity').textContent = article[i].offer.rooms + ' комнаты для ' + article[i].offer.rooms + ' гостей';
advert.querySelector('.popup__text--time').textContent = 'Заезд после ' +  article[i].offer.checkin + ', выезд до ' + article[i].offer.checkout;
advert.querySelector('.popup__photos').src = article[i].offer.photos;
advert.querySelector('.popup__feature').textContent = article[i].offer.features;
advert.querySelector('.popup__avatar').src = article[i].author.avatar;

return advert;
};

for (i = 0; i <= 8; i++) {
  var fragmentAdvert = fragment.appendChild(articleRender(mapObjects));
  articleElement.appendChild(fragmentAdvert);
};
