import React from "react";
import Places from './places';
import Map from './map';
import PropTypes from "prop-types";

const City = (props) => {
  const {isEmpty = false} = props;
  return (
    <div className="cities">
      <div className={`cities__places-container container${isEmpty ? ` cities__places-container--empty` : ``}`}>
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
            <Map/>
          </>
        }
      </div>
    </div>
  );
};

City.propTypes = {
  isEmpty: PropTypes.bool
};

export default City;
