import React from "react";
import PropTypes from "prop-types";

import {cities} from '../../const';

import Places from '../places/places';
import Map from '../map/map';
import placesArr from '../../mock/mock-places';

const City = (props) => {
  const {city} = props;

  const places = placesArr.filter((place) => cities[place.city.name] === city);
  const isEmpty = places.length < 1;

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
            <Places placesNumber={places.length} cityName={city}/>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map places={places}/>
              </section>
            </div>
          </>
        }
      </div>
    </div>
  );
};

City.propTypes = {
  isEmpty: PropTypes.bool,
  city: PropTypes.oneOf(Object.values(cities)).isRequired
};

City.defaultProps = {
  isEmpty: false
};

export default City;
