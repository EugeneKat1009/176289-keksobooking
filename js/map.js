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
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
