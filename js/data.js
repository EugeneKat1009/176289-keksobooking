'use strict';

(function () {
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
  var photoTemplate = document.querySelector('template').content.querySelector('.popup__photo');


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

  for (var i = 0; i < 8; i++) {
    mapObjects.push(createMap());
  }

  // объекты
  var renderButtonMap = function (pin) {
    var button = buttonTemplate.cloneNode(true);
    button.querySelector('img').src = pin.author.avatar;
    button.querySelector('img').alt = pin.offer.title;
    button.style.left = pin.location.x + 'px';
    button.style.top = pin.location.y + 'px';
    button.addEventListener('click', function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      onPinClick(pin);
    });
    return button;
  };

  // функция генерации объявления
  var popupRender = function (pin) {

    var advert = articleTemplate.cloneNode(true);
    advert.querySelector('.popup__title').textContent = pin.offer.title;
    advert.querySelector('.popup__text--address').innerHTML = pin.offer.address;
    advert.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';

    var accommodationType;
    if (pin.offer.type === 'flat') {
      accommodationType = 'Квартира';
    } else if (pin.offer.type === 'bungalo') {
      accommodationType = 'Бунгало';
    } else if (pin.offer.type === 'house') {
      accommodationType = 'Дом';
    }

    advert.querySelector('.popup__type').textContent = accommodationType;
    advert.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.rooms + ' гостей';
    advert.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

    var featuresItems = advert.querySelector('.popup__features');
    featuresItems.innerHTML = '';
    for (var j = 0; j < pin.offer.features.length; j++) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature', 'popup__feature--' + pin.offer.features[j]);
      featuresItems.appendChild(featuresItem);
    }
    advert.querySelector('.popup__description').textContent = pin.offer.description;

    advert.querySelector('.popup__photos').innerHTML = '';
    for (i = 0; i < pin.offer.photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = pin.offer.photos[i];
      advert.appendChild(photo);
    }

    advert.querySelector('.popup__avatar').src = pin.author.avatar;

    return advert;
  };
  var mapPinMain = document.querySelector('.map__pin--main');

  var onPinMainClick = function () {
    window.backend.load(onLoad, onError);
  };

  mapPinMain.addEventListener('mouseup', onPinMainClick);
  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onPinMainClick);
  });

  var onPinClick = function (pin) {

    var fragment = document.createDocumentFragment();
    var fragmentAdvert = fragment.appendChild(popupRender(pin));
    articleElement.appendChild(fragmentAdvert);

    var popupClose = fragmentAdvert.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      removePopup();
    });
    var popup = document.querySelector('.popup');
    var removePopup = function () {
      if (popup) {
        popup.remove();
      }
    };
  };

  var onLoad = function (pins) {
    var fragment = document.createDocumentFragment();

    for (i = 0; i < pins.length; i++) {
      fragment.appendChild(renderButtonMap(pins[i]));
    }
    buttonElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.classList.add('error');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
