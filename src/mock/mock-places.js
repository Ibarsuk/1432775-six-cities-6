import {generateRandomSet, getRandomInteger, TEXT, AVATARS, NAMES} from './additional';
import {accomodationType, cities} from '../const';

const goods = [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`];

const images = [`img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`, `img/studio-01.jpg`];

class CreateMockPlace {
  constructor() {
    this.bedrooms = getRandomInteger(0, 6);
    this.city = {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: Object.keys(cities)[getRandomInteger(0, Object.keys(cities).length - 1)]
    };
    this.description = generateRandomSet(TEXT).join(` `);
    this.goods = generateRandomSet(goods);
    this.host = {
      avatarUrl: AVATARS[getRandomInteger(0, AVATARS.length - 1)],
      id: Math.random(),
      isPro: Boolean(getRandomInteger(0, 1)),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    };
    this.id = null;
    this.images = generateRandomSet(images);
    this.isFavourite = Boolean(getRandomInteger(0, 1));
    this.isPremium = Boolean(getRandomInteger(0, 1));
    this.location = {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    };
    this.maxAdults = getRandomInteger(0, 12);
    this.preview = images[getRandomInteger(0, images.length - 2)];
    this.price = getRandomInteger(30, 300);
    this.raiting = getRandomInteger(1, 5);
    this.title = TEXT[getRandomInteger(0, TEXT.length - 2)];
    const types = Object.keys(accomodationType);
    this.placeType = types[getRandomInteger(0, types.length - 2)];
  }

  getPlace(id) {
    this.id = id;
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

// На случай, если понадобится проверка большим количеством случайных мест
export const randomPlaces = new Array(8).fill().map((value, i) => new CreateMockPlace().getPlace(i));

const places = [
  {
    bedrooms: 6,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Brussels`
    },
    description: `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    goods: [`Washing machine`],
    host: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 0.4363250592823429,
      isPro: false,
      name: `Ann`
    },
    id: 0,
    images: [`img/apartment-01.jpg`, `img/apartment-03.jpg`, `img/studio-01.jpg`],
    isFavourite: true,
    isPremium: true,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    maxAdults: 12,
    preview: `img/apartment-01.jpg`,
    price: 134,
    raiting: 4,
    title: `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    placeType: `room`
  },
  {
    bedrooms: 5,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Paris`
    },
    description: `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    goods: [`Cable TV`, `Kitchen`],
    host: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 0.3762986076333621,
      isPro: true,
      name: `Max`
    },
    id: 1,
    images: [`img/apartment-01.jpg`],
    isFavourite: true,
    isPremium: false,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    maxAdults: 1,
    preview: `img/apartment-01.jpg`,
    price: 79,
    raiting: 1,
    title: `Aliquam erat volutpat.`,
    placeType: `room`
  },
  {
    bedrooms: 6,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Cologne`
    },
    description: `Aliquam erat volutpat.`,
    goods: [`Washing machine`, `Heating`, `Coffee machine`],
    host: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 0.44847128733385366,
      isPro: true,
      name: `Mary`
    },
    id: 2,
    images: [`img/apartment-01.jpg`],
    isFavourite: false,
    isPremium: true,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    maxAdults: 5,
    preview: `img/apartment-01.jpg`,
    price: 75,
    raiting: 5,
    title: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    placeType: `house`
  },
  {
    bedrooms: 6,
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: `Cologne`
    },
    description: `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    goods: [`Heating`, `Kitchen`, `Washing machine`, `Coffee machine`],
    host: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 0.8771248481107099,
      isPro: false,
      name: `Max`
    },
    id: 3,
    images: [`img/room.jpg`, `img/apartment-01.jpg`],
    isFavourite: false,
    isPremium: true,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    maxAdults: 11,
    preview: `img/room.jpg`,
    price: 218,
    raiting: 4,
    title: `In rutrum ac purus sit amet tempus.`,
    placeType: `house`
  },
];

export default places;
