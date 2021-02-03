const places = [
  {
    id: Math.random(),
    preview: `img/apartment-01.jpg`,
    price: 120,
    raiting: 4,
    title: `Beautiful & luxurious apartment at great location`,
    placeType: `apartment`,
    isPremium: true,
    isFavourite: false,
    city: {
      name: `Amsterdam`
    }
  },
  {
    id: Math.random(),
    preview: `img/room.jpg`,
    price: 80,
    raiting: 3,
    title: `Wood and stone place`,
    placeType: `room`,
    isPremium: false,
    isFavourite: true,
    city: {
      name: `Dusseldorf`
    }
  },
  {
    id: Math.random(),
    preview: `img/apartment-02.jpg`,
    price: 132,
    raiting: 4,
    title: `Canal View Prinsengracht`,
    placeType: `apartment`,
    isPremium: false,
    isFavourite: false,
    city: {
      name: `Amsterdam`
    }
  },
  {
    id: Math.random(),
    preview: `img/apartment-03.jpg`,
    price: 180,
    raiting: 5,
    title: `Nice, cozy, warm big bed apartment`,
    placeType: `apartment`,
    isPremium: true,
    isFavourite: false,
    city: {
      name: `Paris`
    }
  },
  {
    id: Math.random(),
    preview: `img/room.jpg`,
    price: 80,
    raiting: 2,
    title: `Wood and stone place`,
    placeType: `room`,
    isPremium: false,
    isFavourite: true,
    city: {
      name: `Paris`
    }
  }
];

export default places;
