import {generateRandomSet, getRandomInteger, TEXT, AVATARS, NAMES} from './additional';

const createReview = () => {
  return {
    comment: generateRandomSet(TEXT).join(` `),
    date: new Date(`${getRandomInteger(2017, 2020)} ${getRandomInteger(0, 11)} ${getRandomInteger(1, 31)} ${getRandomInteger(1, 23)}:${getRandomInteger(1, 59)}`),
    id: Math.random(),
    rating: getRandomInteger(1, 5),
    user: {
      avatarUrl: AVATARS[getRandomInteger(0, AVATARS.length - 1)],
      id: Math.random(),
      isPro: Boolean(getRandomInteger(0, 1)),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)]
    }
  };
};

// На случай, если понадобится проверка большим количеством случайных обзоров
export const randomReviews = new Array(13).fill().map(createReview);

const reviews = [
  {
    comment: `Sed sed nisi sed augue convallis suscipit in sed felis. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: new Date(1570820460000),
    id: 0.986186352029718,
    rating: 3,
    user: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 0.8846630220929281,
      isPro: true,
      name: `Max`
    }
  },
  {
    comment: `In rutrum ac purus sit amet tempus. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    date: new Date(1558715100000),
    id: 0.447570478209524,
    rating: 5,
    user: {
      avatarUrl: `img/avatar-max.jpg`,
      id: 0.5666544607470669,
      isPro: true,
      name: `Mary`
    }
  },
  {
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    date: new Date(1503479160000),
    id: 0.8139617600591484,
    rating: 5,
    user: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 0.27717324160754075,
      isPro: false,
      name: `Mary`
    }
  },
  {
    comment: `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nunc fermentum tortor ac porta dapibus.`,
    date: new Date(1606450980000),
    id: 0.957985138744075,
    rating: 3,
    user: {
      avatarUrl: `img/avatar-angelina.jpg`,
      id: 0.0008393380257802896,
      isPro: true,
      name: `Dan`
    }
  },
];

export default reviews;
