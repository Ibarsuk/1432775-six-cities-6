import {authorize as createAuthAction, loadOffers, loadFavouriteOffers, changeOffer, setAuthChecked} from './action-creators';
import {ApiRoutes, StatusCode} from '../const';
import api, {adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient} from '../api';

export const fetchOffers = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiRoutes.HOTELS)
  .then(({data}) => data.map(adaptOfferToClient))
  .then((offers) => dispatch(loadOffers(offers)));
};

export const fetchFavouriteOffers = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiRoutes.FAVORITE)
        .then(({data}) => data.map(adaptOfferToClient))
        .then((favouriteOffers) => dispatch(loadFavouriteOffers(favouriteOffers)));
};

export const setOfferFavouriteStatus = ({offerId, status, onSuccessCallBack, onFailCallBack}) => (dispatch, _state, passedApi) => {
  passedApi.post(`${ApiRoutes.FAVORITE}/${offerId}/${status}`)
  .then(({data}) => {
    const updatedOffer = adaptOfferToClient(data);
    dispatch(changeOffer(updatedOffer));
    if (onSuccessCallBack) {
      onSuccessCallBack(updatedOffer);
    }
  })
  .catch(() => {
    if (onFailCallBack) {
      onFailCallBack();
    }
  });
};

export const authorize = (authorizeData, onLoginSuccess, onLoginFailCallback) => (dispatch, _state, passedApi) => {
  passedApi.post(ApiRoutes.LOGIN, authorizeData)
  .catch((err) => {
    if (err.response.status === StatusCode.BAD_REQUEST) {
      onLoginFailCallback();
    }
    throw err;
  })
  .then(({data}) => {
    dispatch(createAuthAction({
      userInfo: adaptUserInfoToClient(data),
      isAuthorized: true
    }));
    onLoginSuccess();
  });
};

export const logout = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiRoutes.LOGOUT)
  .then(() => {
    dispatch(createAuthAction({
      userInfo: {},
      isAuthorized: false
    }));
  });
};

export const checkAuth = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiRoutes.LOGIN)
  .then(({data}) => {
    dispatch(createAuthAction({
      userInfo: adaptUserInfoToClient(data),
      isAuthorized: true
    }));
  })
  .catch(() => {})
  .finally(() => {
    dispatch(setAuthChecked());
  });
};

export const fetchOffer = async (offerId) => {
  return api.get(`${ApiRoutes.HOTELS}/${offerId}`)
         .then(({data}) => adaptOfferToClient(data));
};

export const fetchNearOffers = async (offerId) => {
  return api.get(`${ApiRoutes.HOTELS}/${offerId}/nearby`)
         .then(({data}) => data.map(adaptOfferToClient));
};

export const fetchReviews = async (offerId) => {
  return api.get(`${ApiRoutes.COMMENTS}/${offerId}`)
  .then(({data}) => data.map(adaptReviewToClient));
};

export const postReview = async (offerId, rewievData) => {
  return api.post(`${ApiRoutes.COMMENTS}/${offerId}`, rewievData)
  .then(({data}) => data.map(adaptReviewToClient));
};
