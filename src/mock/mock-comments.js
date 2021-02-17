import {generateRandomSet, getRandomInteger, texts, avatars, names} from './additional';

const createReview = () => {
  return {
    comment: generateRandomSet(texts).join(` `),
    date: new Date(`${getRandomInteger(2017, 2020)} ${getRandomInteger(0, 11)} ${getRandomInteger(1, 31)} ${getRandomInteger(1, 23)}:${getRandomInteger(1, 59)}`),
    id: Math.random(),
    rating: getRandomInteger(1, 5),
    user: {
      avatarUrl: avatars[getRandomInteger(0, avatars.length - 1)],
      id: Math.random(),
      isPro: Boolean(getRandomInteger(0, 1)),
      name: names[getRandomInteger(0, names.length - 1)]
    }
  };
};

// На случай, если понадобится проверка большим количеством случайных обзоров
export const randomReviews = new Array(13).fill().map(createReview);

const reviews = [
  {
    comment: `Sed sed nisi sed augue convallis suscipit in sed felis. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: new Date(1570820460000),
    id: 1,
    rating: 3,
    user: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 1,
      isPro: true,
      name: `Max`
    }
  },
  {
    comment: `In rutrum ac purus sit amet tempus. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    date: new Date(1558715100000),
    id: 2,
    rating: 5,
    user: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 2,
      isPro: true,
      name: `Mary`
    }
  },
  {
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    date: new Date(1503479160000),
    id: 3,
    rating: 5,
    user: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 3,
      isPro: false,
      name: `Mary`
    }
  },
  {
    comment: `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nunc fermentum tortor ac porta dapibus.`,
    date: new Date(1606450980000),
    id: 4,
    rating: 3,
    user: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 4,
      isPro: true,
      name: `Dan`
    }
  },
];

export default reviews;
