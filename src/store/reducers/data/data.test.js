import dataReducer from './data';
import ActionType from '../../actions';

describe(`Data reducer works correctly`, () => {
  const initialState = {
    offers: [],
    offersLoaded: false,
    favouriteOffers: [],
    favouriteOffersLoaded: false
  };
  it(`Reducer should set offers and change offersLoaded status`, () => {
    const newOffers = [{}, {}, {}];

    const action = {
      type: ActionType.LOAD_OFFERS,
      payload: newOffers
    };

    const expectedState = Object.assign(
        {},
        initialState,
        {
          offers: newOffers,
          offersLoaded: true
        }
    );

    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer should set favourite offers and change favouriteOffersLoaded status`, () => {
    const newFavouriteOffers = [{}, {}, {}];

    const action = {
      type: ActionType.LOAD_FAVOURITE_OFFERS,
      payload: newFavouriteOffers
    };

    const expectedState = Object.assign(
        {},
        initialState,
        {
          favouriteOffers: newFavouriteOffers,
          favouriteOffersLoaded: true
        }
    );

    expect(dataReducer(initialState, action)).toEqual(expectedState);
  });

  it(`Reducer should update offer correctly`, () => {
    const updatedOffer = {id: 1, rating: 4};

    const action = {
      type: ActionType.CHANGE_OFFER,
      payload: updatedOffer
    };

    expect(
        dataReducer(initialState, action).offers
        .find((offer) => offer === updatedOffer)
    ).toEqual(updatedOffer);

    expect(
        dataReducer(initialState, action).favouriteOffers
      .find((offer) => offer === updatedOffer)
    ).toEqual(updatedOffer);
  });

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });
});
