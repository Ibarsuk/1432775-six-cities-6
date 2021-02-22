import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {cities} from '../../const';
import {place as propPlace} from '../prop-types';

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

const CityWrapper = (props) => {
  const {city, offers} = props;

  const filteredPlaces = offers.slice().filter((place) => cities[place.city.name] === city);
  const isEmpty = filteredPlaces.length < 1;

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
            <OffersList offers={filteredPlaces} placesNumber={filteredPlaces.length} cityName={city}/>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={filteredPlaces}/>
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
  offers: PropTypes.arrayOf(PropTypes.shape(propPlace)).isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers
});

export default connect(mapStateToProps)(CityWrapper);
