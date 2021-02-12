export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomSet = (array) => {
  let newArr = [];
  for (let i = 0; i < getRandomInteger(1, array.length - 1); i++) {
    newArr.push(array[getRandomInteger(0, array.length - 1)]);
  }
  return Array.from(new Set(newArr));
};

export const texts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
  `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`
];

export const avatars = [
  `img/avatar-angelina.jpg`,
  `img/avatar-max.jpg`
];

export const names = [
  `Angelina`,
  `Max`,
  `Ann`,
  `Nick`,
  `Dan`,
  `Mary`
];
