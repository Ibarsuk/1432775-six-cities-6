import React, {useState} from "react";
import PropTypes from "prop-types";

import withMapRelatedList from '../../hocks/with-map-related-list';

import {OfferCardType, SortType} from '../../const';
import {offerPropTypes} from '../prop-types';

import OfferCardProxy from '../offer-card/offer-card-proxy';


const offerFilters = {
  [SortType.POPULAR]: (offers) => offers,
  [SortType.PRICE_LOW_TO_HIGH]: (offers) => offers.slice().sort((previous, current) => previous.price - current.price),
  [SortType.PRICE_HIGH_TO_LOW]: (offers) => offers.slice().sort((previous, current) => current.price - previous.price),
  [SortType.RAITING]: (offers) => offers.slice().sort((previous, current) => current.raiting - previous.raiting)
};

const OffersList = (props) => {
  const {offers, cityName, onOfferCardMouseOver} = props;
  const [state, setState] = useState({
    activeSort: SortType.POPULAR,
    isSortSelectOpened: false
  });

  const sorteredOffers = offerFilters[state.activeSort](offers);

  const handleSortSelecClick = () => {
    setState((prevState) => ({
      ...state,
      isSortSelectOpened: !prevState.isSortSelectOpened
    }));
  };

  const handleSortButtonClick = (sortType) => {
    setState({
      ...state,
      activeSort: sortType,
      isSortSelectOpened: false
    });
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {cityName}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex="0" onClick={handleSortSelecClick}>
          {state.activeSort}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        {state.isSortSelectOpened
        &&
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex="0" onClick={() => handleSortButtonClick(SortType.POPULAR)}>Popular</li>
          <li className="places__option" tabIndex="0" onClick={() => handleSortButtonClick(SortType.PRICE_LOW_TO_HIGH)}>Price: low to high</li>
          <li className="places__option" tabIndex="0" onClick={() => handleSortButtonClick(SortType.PRICE_HIGH_TO_LOW)}>Price: high to low</li>
          <li className="places__option" tabIndex="0" onClick={() => handleSortButtonClick(SortType.RAITING)}>Top rated first</li>
        </ul>}
      </form>
      <div className="cities__places-list places__list tabs__content">
        {sorteredOffers.map((offer) => <OfferCardProxy {...offer} key={`offer${offer.id}`} onMouseOver={onOfferCardMouseOver} cardType={OfferCardType.CITIES}/>)}
      </div>
    </section>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerPropTypes)).isRequired,
  cityName: PropTypes.string.isRequired,
  onOfferCardMouseOver: PropTypes.func.isRequired
};

OffersList.defaultProps = {
  cityName: `chosen city`,
};

export {OffersList};
export default withMapRelatedList(OffersList);
