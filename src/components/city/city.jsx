import React from "react";
import PropTypes from "prop-types";

import Places from '../places/places';
import Map from '../map/map';
import places from '../../mock/mock-places';

const City = (props) => {
  const {isEmpty} = props;

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
            <Places placesNumber={0} cityName="chosen city"/>
            <Map places={places}/>
          </>
        }
      </div>
    </div>
  );
};

City.propTypes = {
  isEmpty: PropTypes.bool
};

City.defaultProps = {
  isEmpty: false
};

export default City;
