import {ReducerNameSpace} from '../root-reducer';

export const getOffers = (state) => state[ReducerNameSpace.DATA].offers;

export const getLoadedOffersStatus = (state) => state[ReducerNameSpace.DATA].offersLoaded;

export const getFavouriteOffers = (state) => state[ReducerNameSpace.DATA].favouriteOffers;

export const getLoadedFavouriteOffersStatus = (state) => state[ReducerNameSpace.DATA].favouriteOffersLoaded;
