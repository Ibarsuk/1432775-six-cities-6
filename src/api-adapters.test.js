import {adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient} from "./api";
import {userInfo} from './test-mocks';

describe(`Api adapters work correctly`, () => {
  it(`Adapter adaptOfferToClient works correctly`, () => {
    const offer = {
      "bedrooms": 3,
      "city": {
        "location": {
          "latitude": 52.370216,
          "longitude": 4.895168,
          "zoom": 10
        },
        "name": `Amsterdam`
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      "host": {
        "avatar_url": `img/1.png`,
        "id": 3,
        "is_pro": true,
        "name": `Angelina`
      },
      "id": 1,
      "images": [`img/1.png`, `img/2.png`],
      "is_favorite": false,
      "is_premium": false,
      "location": {
        "latitude": 52.35514938496378,
        "longitude": 4.673877537499948,
        "zoom": 8
      },
      "max_adults": 4,
      "preview_image": `img/1.png`,
      "price": 120,
      "rating": 4.8,
      "title": `Beautiful & luxurious studio at great location`,
      "type": `apartment`
    };

    const adaptedOffer = {
      bedrooms: 3,
      city: {
        location: {latitude: 52.370216, longitude: 4.895168, zoom: 10},
        name: `Amsterdam`
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [
        `Heating`,
        `Kitchen`,
        `Cable TV`,
        `Washing machine`,
        `Coffee machine`,
        `Dishwasher`
      ],
      host: {id: 3, name: `Angelina`, avatarUrl: `img/1.png`, isPro: true},
      id: 1,
      images: [`img/1.png`, `img/2.png`],
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      price: 120,
      rating: 4.8,
      title: `Beautiful & luxurious studio at great location`,
      isFavourite: false,
      isPremium: false,
      maxAdults: 4,
      previewImage: `img/1.png`,
      placeType: `apartment`
    };

    expect(adaptOfferToClient(offer)).toEqual(adaptedOffer);
  });

  it(`Adapter adaptReviewToClient works correctly`, () => {
    const review = {
      "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      "date": `2019-05-08T14:13:56.569Z`,
      "id": 1,
      "rating": 4,
      "user": {
        "avatar_url": `img/1.png`,
        "id": 4,
        "is_pro": false,
        "name": `Max`
      }
    };

    const adaptedReview = {
      comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      date: new Date(`2019-05-08T14:13:56.569Z`),
      id: 1,
      rating: 4,
      user: {id: 4, name: `Max`, avatarUrl: `img/1.png`, isPro: false}
    };

    expect(adaptReviewToClient(review)).toEqual(adaptedReview);
  });

  it(`Adapter adaptUserIfoToClient works correctly`, () => {

    const adaptedUserInfo = adaptUserInfoToClient(userInfo);

    expect(adaptUserInfoToClient(userInfo)).toEqual(adaptedUserInfo);
  });
});
