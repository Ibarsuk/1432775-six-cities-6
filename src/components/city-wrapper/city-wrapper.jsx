import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {cities} from '../../const';
import {propOffer} from '../prop-types';

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

const CityWrapper = (props) => {
  const {city, offers} = props;

  const filteredOffers = offers.slice().filter((offer) => cities[offer.city.name] === city);
  const isEmpty = filteredOffers.length < 1;

  const containerEmptyClassName = isEmpty ? ` cities__places-container--empty` : ``;
  return (
    <div className="cities">
      <div className={`cities__places-container container${containerEmptyClassName}`}>
        {isEmpty ?
          <>
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </>
          :
          <>
            <OffersList offers={filteredOffers} offersNumber={filteredOffers.length} cityName={city}/>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={filteredOffers}/>
              </section>
            </div>
          </>
        }
      </div>
    </div>
  );
};

CityWrapper.propTypes = {
  city: PropTypes.oneOf(Object.values(cities)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(propOffer)).isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers
});

export {CityWrapper};
export default connect(mapStateToProps)(CityWrapper);
