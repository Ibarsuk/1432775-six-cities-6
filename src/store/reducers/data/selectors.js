import {createSelector} from 'reselect';
import {cities} from '../../../const';
import {ReducerNameSpace} from '../root-reducer';
import {getActiveCity} from '../work-process/selectors';

export const getOffers = (state) => state[ReducerNameSpace.DATA].offers;

export const getOffersFilteredByCity = createSelector(
    [getOffers, getActiveCity],
    (offers, activeCity) => offers.slice().filter((offer) => cities[offer.city.name] === activeCity)
);

export const getLoadedOffersStatus = (state) => state[ReducerNameSpace.DATA].offersLoaded;

export const getFavouriteOffers = (state) => state[ReducerNameSpace.DATA].favouriteOffers;

export const getLoadedFavouriteOffersStatus = (state) => state[ReducerNameSpace.DATA].favouriteOffersLoaded;
