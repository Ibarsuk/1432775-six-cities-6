import {generateRandomSet, getRandomInteger, TEXT, AVATARS, NAMES} from './additional';
import {AccomodationType, CITIES} from '../const';

const GOODS = [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`];

const IMAGES = [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`, `img/studio-01.jpg`];

class CreateMockPlace {
  constructor() {
    this.bedrooms = getRandomInteger(0, 6);
    this.city = {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: CITIES[getRandomInteger(0, CITIES.length - 1)]
    };
    this.description = generateRandomSet(TEXT).join(` `);
    this.goods = generateRandomSet(GOODS);
    this.host = {
      avatarUrl: AVATARS[getRandomInteger(0, AVATARS.length - 1)],
      id: Math.random(),
      isPro: Boolean(getRandomInteger(0, 1)),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    };
    this.id = Math.random();
    this.images = generateRandomSet(IMAGES);
    this.isFavourite = Boolean(getRandomInteger(0, 1));
    this.isPremium = Boolean(getRandomInteger(0, 1));
    this.location = {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    };
    this.maxAdults = getRandomInteger(0, 12);
    this.preview = IMAGES[getRandomInteger(0, IMAGES.length - 2)];
    this.price = getRandomInteger(30, 300);
    this.raiting = getRandomInteger(1, 5);
    this.title = TEXT[getRandomInteger(0, TEXT.length - 2)];
    const types = Object.keys(AccomodationType);
    this.placeType = types[getRandomInteger(0, types.length - 2)];
  }

  getPlace() {
    return {
      bedrooms: this.bedrooms,
      city: this.city,
      description: this.description,
      goods: this.goods,
      host: this.host,
      id: this.id,
      images: this.images,
      isFavourite: this.isFavourite,
      isPremium: this.isPremium,
      location: this.location,
      maxAdults: this.maxAdults,
      preview: this.preview,
      price: this.price,
      raiting: this.raiting,
      title: this.title,
      placeType: this.placeType
    };
  }
}

export default new Array(7).fill().map(() => new CreateMockPlace().getPlace());
