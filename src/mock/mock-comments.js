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

export default new Array(13).fill().map(createReview);
