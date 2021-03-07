import ActionCreator from './action-creator';
import {ApiPath, StatusCode} from '../const';
import api, {adaptOfferToClient, adaptReviewToClient, adaptUserInfoToClient} from '../api';

export const fetchOffers = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiPath.HOTELS)
  .then(({data}) => data.map(adaptOfferToClient))
  .then((offers) => dispatch(ActionCreator.loadOffers(offers)));
};

export const authorize = (authorizeData, onLoginSuccess, onLoginFailCb) => (dispatch, _state, passedApi) => {
  passedApi.post(ApiPath.LOGIN, authorizeData)
  .catch((err) => {
    if (err.response.status === StatusCode.BAD_REQUEST) {
      onLoginFailCb();
    }
    throw err;
  })
  .then(({data}) => {
    dispatch(ActionCreator.authorize(adaptUserInfoToClient(data)));
    dispatch(ActionCreator.changeAuth(true));
    onLoginSuccess();
  });
};

export const logout = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiPath.LOGOUT)
  .then(() => {
    dispatch(ActionCreator.changeAuth(false));
    dispatch(ActionCreator.authorize({}));
  });
};

export const checkAuth = () => (dispatch, _state, passedApi) => {
  passedApi.get(ApiPath.LOGIN)
  .then(({data}) => {
    dispatch(ActionCreator.changeAuth(true));
    dispatch(ActionCreator.authorize(adaptUserInfoToClient(data)));
  })
  .catch(() => {});
};

export const fetchOffer = async (offerId) => {
  return api.get(`${ApiPath.HOTELS}/${offerId}`)
         .then(({data}) => adaptOfferToClient(data));
};

export const fetchNearOffers = async (offerId) => {
  return api.get(`${ApiPath.HOTELS}/${offerId}/nearby`)
         .then(({data}) => data.map(adaptOfferToClient));
};

export const fetchReviews = async (offerId) => {
  return api.get(`${ApiPath.COMMENTS}/${offerId}`)
  .then(({data}) => data.map(adaptReviewToClient));
};
