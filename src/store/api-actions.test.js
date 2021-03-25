import {
  fetchFavouriteOffers,
  fetchOffers,
  setOfferFavouriteStatus,
  authorize,
  logout,
  checkAuth,
  fetchOffer,
  fetchNearOffers,
  fetchReviews,
  postReview
} from './api-actions';
import MockAdapter from "axios-mock-adapter";
import api, {adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient} from '../api';
import {ApiRoutes} from '../const';
import ActionType from './actions';
import {mockOffers, userInfo, mockReviews} from '../test-mocks';

describe(`Async operations work correctly`, () => {
  const apiMock = new MockAdapter(api);

  it(`Should make a correct API call to /hotels`, () => {
    const dispatch = jest.fn();

    apiMock
    .onGet(ApiRoutes.HOTELS)
    .reply(200, mockOffers);

    const offersLoader = fetchOffers();

    return offersLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        payload: mockOffers.map(adaptOfferToClient)
      });
    });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const dispatch = jest.fn();

    apiMock.onGet(ApiRoutes.FAVORITE)
    .reply(200, mockOffers);

    const favouriteOffersLoader = fetchFavouriteOffers();

    return favouriteOffersLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FAVOURITE_OFFERS,
        payload: mockOffers.map(adaptOfferToClient)
      });
    });
  });

  it(`Should make a correct API call to update offer favourite status`, () => {
    const dispatch = jest.fn();

    const testOffer = mockOffers[0];
    const status = testOffer.isFavourite ? 0 : 1;

    const onSuccessCallback = jest.fn();

    apiMock.onPost(`${ApiRoutes.FAVORITE}/${testOffer.id}/${status}`)
    .reply(200, testOffer);

    const setFavouriteStatus = setOfferFavouriteStatus({
      offerId: testOffer.id,
      status,
      onSuccessCallback
    });

    const expectedOffer = Object.assign(
        {},
        testOffer,
        {isFavourite: !testOffer.isFavourite}
    );

    return setFavouriteStatus(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.CHANGE_OFFER,
        payload: adaptOfferToClient(expectedOffer)
      });
    });
  });

  it(`Failed API call to update offer should be caught`, () => {
    const dispatch = jest.fn();

    const testOffer = mockOffers[0];
    const status = testOffer.isFavourite ? 0 : 1;

    const onSuccessCallback = jest.fn();
    const onFailCallback = jest.fn();

    apiMock.onPost(`${ApiRoutes.FAVORITE}/${testOffer.id}/${status}`)
    .reply(400);

    const setFavouriteStatus = setOfferFavouriteStatus({
      offerId: testOffer.id,
      status,
      onSuccessCallback,
      onFailCallback
    });

    return setFavouriteStatus(dispatch, () => {}, api)
    .then(() => {
      expect(onFailCallback).toHaveBeenCalledTimes(1);
    });
  });

  it(`Should make a correct API call to /login`, () => {
    const dispatch = jest.fn();

    const onSuccessCallback = jest.fn();
    const onFailCallback = jest.fn();

    apiMock
    .onPost(ApiRoutes.LOGIN)
    .reply(200, userInfo);

    const authorizeApiAction = authorize({}, onSuccessCallback, onFailCallback);

    return authorizeApiAction(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTHORIZE,
        payload: {
          userInfo: adaptUserInfoToClient(userInfo),
          isAuthorized: true
        }
      });
    });
  });

  it(`Failed API call to /login should be caught`, () => {
    const dispatch = jest.fn();

    const onSuccessCallback = jest.fn();
    const onFailCallback = jest.fn();

    apiMock
    .onPost(ApiRoutes.LOGIN)
    .reply(400);

    const authorizeApiAction = authorize({}, onSuccessCallback, onFailCallback);

    return authorizeApiAction(dispatch, () => {}, api)
    .catch(() => {
      expect(onFailCallback).toHaveBeenCalledTimes(1);
    });
  });

  it(`Should make a correct API call to /logout`, () => {
    const dispatch = jest.fn();

    apiMock
    .onGet(ApiRoutes.LOGOUT)
    .reply(200);

    const logoutApiAction = logout();

    return logoutApiAction(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTHORIZE,
        payload: {
          userInfo: {},
          isAuthorized: false
        }
      });
    });
  });

  it(`Should make a correct API call to check authorization`, () => {
    const dispatch = jest.fn();

    apiMock
    .onGet(ApiRoutes.LOGIN)
    .reply(200, userInfo);

    const chechAuthApiAction = checkAuth();

    return chechAuthApiAction(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTHORIZE,
        payload: {
          userInfo: adaptUserInfoToClient(userInfo),
          isAuthorized: true
        }
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_AUTH_CHECKED
      });
    });
  });

  it(`Should make a correct API call to fetch one exact offer`, () => {
    const testOffer = mockOffers[0];
    apiMock
    .onGet(`${ApiRoutes.HOTELS}/${testOffer.id}`)
    .reply(200, testOffer);

    return fetchOffer(testOffer.id)
    .then((response) => {
      expect(response).toEqual(adaptOfferToClient(testOffer));
    });
  });

  it(`Should make a correct API call to fetch near offers`, () => {
    apiMock
    .onGet(`${ApiRoutes.HOTELS}/1/nearby`)
    .reply(200, mockOffers);

    return fetchNearOffers(1)
    .then((response) => {
      expect(response).toEqual(
          mockOffers.map(adaptOfferToClient)
      );
    });
  });

  it(`Should make a correct API call to fetch reviews`, () => {
    apiMock
    .onGet(`${ApiRoutes.COMMENTS}/1`)
    .reply(200, mockReviews);

    return fetchReviews(1)
    .then((response) => {
      expect(response).toEqual(
          mockReviews.map(adaptReviewToClient)
      );
    });
  });

  it(`Should make a correct API call to post review`, () => {
    apiMock
    .onPost(`${ApiRoutes.COMMENTS}/1`)
    .reply(200, mockReviews);

    return postReview(1, {})
    .then((response) => {
      expect(response).toEqual(
          mockReviews.map(adaptReviewToClient)
      );
    });
  });
});
