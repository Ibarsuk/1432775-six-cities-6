import {
  changeCity,
  updateActiveOffer,
  loadOffers,
  loadFavouriteOffers,
  changeOffer,
  authorize,
  setAuthChecked
} from './action-creators';
import ActionType from './actions';

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    const city = `cityName`;
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: city
    };

    expect(changeCity(city)).toEqual(expectedAction);
  });

  it(`Action creator for active offer update returns correct action`, () => {
    const activeOffer = `activeOffer`;
    const expectedAction = {
      type: ActionType.UPDATE_ACTIVE_OFFER,
      payload: activeOffer
    };

    expect(updateActiveOffer(activeOffer)).toEqual(expectedAction);
  });

  it(`Action creator for offers loading returns correct action`, () => {
    const offers = [];
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: offers
    };

    expect(loadOffers(offers)).toEqual(expectedAction);
  });

  it(`Action creator for favourite offers loading returns correct action`, () => {
    const favouriteOffers = [];
    const expectedAction = {
      type: ActionType.LOAD_FAVOURITE_OFFERS,
      payload: favouriteOffers
    };

    expect(loadFavouriteOffers(favouriteOffers)).toEqual(expectedAction);
  });

  it(`Action creator for changing offer returns correct action`, () => {
    const offer = {};
    const expectedAction = {
      type: ActionType.CHANGE_OFFER,
      payload: offer
    };

    expect(changeOffer(offer)).toEqual(expectedAction);
  });

  it(`Action creator for authorization returns correct action`, () => {
    const userInfo = {};
    const expectedAction = {
      type: ActionType.AUTHORIZE,
      payload: userInfo
    };

    expect(authorize(userInfo)).toEqual(expectedAction);
  });

  it(`Action creator for setting authorization checked status returns correct action`, () => {
    const expectedAction = {
      type: ActionType.SET_AUTH_CHECKED
    };

    expect(setAuthChecked()).toEqual(expectedAction);
  });
});
