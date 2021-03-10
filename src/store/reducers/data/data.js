import {createReducer} from '@reduxjs/toolkit';

import ActionType from '../../actions';

const initialState = {
  offers: [],
  areOffersLoaded: false,
  favouriteOffers: [],
  arefavouriteOffersLoaded: false
};

const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(ActionType.LOAD_OFFERS, (state, action) => {
    state.offers = action.payload;
    state.areOffersLoaded = true;
  });
  builder.addCase(ActionType.LOAD_FAVOURITE_OFFERS, (state, action) => {
    state.favouriteOffers = action.payload;
    state.arefavouriteOffersLoaded = true;
  });
  builder.addCase(ActionType.CHANGE_OFFER, (state, action) => {
    const updatedOffer = action.payload;
    const indexInOffers = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
    const indexInFavourites = state.favouriteOffers.findIndex((offer) => offer.id === updatedOffer.id);
    state.offers.splice(indexInOffers, 1, updatedOffer);
    state.favouriteOffers.splice(indexInFavourites, 1, updatedOffer);
  });
});

export default dataReducer;
