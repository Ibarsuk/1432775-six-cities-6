export const accomodationType = {
  apartment: `Apartment`,
  room: `Private room`,
  house: `House`,
  hotel: `Hotel`
};

export const raitings = [
  `perfect`,
  `good`,
  `not bad`,
  `badly`,
  `terribly`
];

export const RAITING_COEFFICIENT = 20;

export const cities = {
  Paris: `paris`,
  Cologne: `cologne`,
  Brussels: `brussels`,
  Amsterdam: `amsterdam`,
  Hamburg: `hamburg`,
  Dusseldorf: `dusseldorf`
};

export const OfferCardType = {
  CITIES: `cities`,
  FAVOURITE: `favourite`,
  NEAR: `near`
};

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  RAITING: `Top rated first`
};

export const ApiPath = {
  HOTELS: `/hotels`,
  FAVORITE: `/favorite`,
  COMMENTS: `/comments`,
  LOGIN: `/login`,
  LOGOUT: `/logout`
};

export const StatusCode = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};

export const RouterPath = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  CITIES: `/cities`,
  OFFER: `/offer`,
  NOT_FOUND: `/not-found`
};

export const Animation = {
  SHAKE: {
    className: `shake`,
    duration: 600
  }
};
