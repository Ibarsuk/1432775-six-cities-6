import {createAction} from '@reduxjs/toolkit';
import ActionType from './actions';

export const changeCity = createAction(ActionType.CHANGE_CITY, (payload) => ({
  payload
}));

export const updateActiveOffer = createAction(ActionType.UPDATE_ACTIVE_OFFER, (payload) => ({
  payload
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (payload) => ({
  payload
}));

export const loadFavouriteOffers = createAction(ActionType.LOAD_FAVOURITE_OFFERS, (payload) => ({
  payload
}));

export const changeOffer = createAction(ActionType.CHANGE_OFFER, (payload) => ({
  payload
}));

export const authorize = createAction(ActionType.AUTHORIZE, (payload) => ({
  payload
}));

export const setAuthChecked = createAction(ActionType.SET_IF_AUTH_CHECKED, () => ({
  payload: true
}));
